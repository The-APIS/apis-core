const axios = require('axios')
const router = require('express').Router()
const EthereumTx = require('ethereumjs-tx').Transaction
const web3 = require('@/constructors/web3')


const getEthereumChainIdFromNetworkSlug = (slug) => {
  switch (slug) {
    case 'rinkeby': return 4
    case 'mainnet':
    default: return 1
  }
}


const prefixPrivateKey = key => key.startsWith('0x') ? key : `0x${key}`
const removePrefixPrivateKey = key => key.startsWith('0x') ? key.substring(2) : key



module.exports = ({ models, ethereum: { web3, buildContract }, ...context }) => {

  router.post('/transfer', async (req, res, next) => {
    try {
      const {
        network = 'mainnet',
        amount = 0,
        sender = '',
        recipient = '',
        tokenContractAddress = '',
        privateKey = '',
        ...body
      } = req.body

      // const chain = getEthereumChainIdFromNetworkSlug(network)
      console.log('req.body', req.body)
      // await USDTContract.methods.transfer('0x2B5f3fa7b39854e34839d8a87b318c1125569929', 25)
      // .send({ from: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1' })
      return buildContract({ type: 'ERC20', address: tokenContractAddress })
        .methods
        .transfer(recipient, amount)
        .call({ from: address })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
