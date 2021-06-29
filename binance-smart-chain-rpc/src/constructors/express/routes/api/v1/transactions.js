const axios = require('axios')
const { Op } = require("sequelize")
const router = require('express').Router()
const EthereumTx = require('ethereumjs-tx').Transaction
const { web3, buildContract } = require('@/constructors/ethereum')


const getEthereumChainIdFromNetworkSlug = (slug) => {
  switch (slug) {
    case 'rinkeby': return 4
    case 'mainnet':
    default: return 1
  }
}


const prefixPrivateKey = key => key.startsWith('0x') ? key : `0x${key}`
const removePrefixPrivateKey = key => key.startsWith('0x') ? key.substring(2) : key


const sendETHTransaction = async (options) => {
  console.log('sendETHTransaction', options)
  const {
    network = 'mainnet',
    transaction = {},
    sender = '',
    privateKey = '',
    recipient = '',
    contractType = '',
    tokenContractAddress = '',
    method = 'transfer',
    amount = 0,
    signed = false,
    ...body
  } = options
  const chain = getEthereumChainIdFromNetworkSlug(network)
  const txData = {
    gasLimit: web3.utils.toHex(100000),
    gasPrice: web3.utils.toHex(50e9), // 10 Gwei
    chainId: web3.utils.toHex(getEthereumChainIdFromNetworkSlug(network)),
    ...transaction,
  }

  if (txData.value) txData.value = web3.utils.toHex(web3.utils.toWei(txData.value.toString()))

  const tx = new EthereumTx({
    ...txData,
    nonce: web3.utils.toHex(await web3.eth.getTransactionCount(sender)),
  }, {
    chain,
  })

  tx.sign(new Buffer.from(removePrefixPrivateKey(privateKey), 'hex'))

  return await web3.eth.sendSignedTransaction(prefixPrivateKey(tx.serialize().toString('hex')))
}


const sendTokenTransaction = async (options) => {
  const {
    network = 'mainnet',
    transaction = {},
    sender = '',
    privateKey = '',
    recipient = '',
    contractType = '',
    tokenContractAddress = '',
    method = 'transfer',
    amount = 0,
    signed = false,
    ...body
  } = options
  const chain = getEthereumChainIdFromNetworkSlug(network)
  const txData = {
    gasLimit: web3.utils.toHex(100000),
    gasPrice: web3.utils.toHex(50e9), // 10 Gwei
    chainId: web3.utils.toHex(getEthereumChainIdFromNetworkSlug(network)),
    ...transaction,
  }

  const contract = await buildContract({
    type: contractType,
    address: tokenContractAddress,
  }, { /* TODO */ })
  const m = contract.methods[method](recipient, amount)
  const encoded = m.encodeABI()

  txData.data = encoded
  txData.value = "0x0"
  txData.to = tokenContractAddress

  const tx = new EthereumTx({
    ...txData,
    nonce: web3.utils.toHex(await web3.eth.getTransactionCount(sender)),
  }, {
    chain,
  })

  tx.sign(new Buffer.from(removePrefixPrivateKey(privateKey), 'hex'))

  return web3.eth.sendSignedTransaction(prefixPrivateKey(tx.serialize().toString('hex')))
}


module.exports = ({ models, ...context }) => {

  router.post('/', async (req, res, next) => {
    try {
      const {
        network = 'mainnet',
        transaction = {},
        sender = '',
        privateKey = '',
        recipient = '',
        contractType = '',
        tokenContractAddress = '',
        method = null,
        amount = 0,
        signed = false,
        ...body
      } = req.body

      const chain = getEthereumChainIdFromNetworkSlug(network)

      return res.status(200).json(method ? await sendTokenTransaction(req.body) : await sendETHTransaction(req.body))
      // const gasStationResponse = await axios.get(`${process.env.ETH_GAS_STATION_API_URL}?api-key=${process.env.ETH_GAS_STATION_API_KEY}`)

    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  router.get('/', async (req, res, next) => {
    try {
      let {
        chain = 'ethereum',
        network = 'rinkeby',
        limit = 100,
        offset = 0,
        ...query
      } = req.query

      const txs = await models.EthereumTx.findAll({
        where: {
          [Op.or]: {
            ...query,
          },
        },
        limit: Math.min(limit, 1000),
        offset,
        raw: true,
      })

      return res.status(200).json({
        data: txs,
      })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
