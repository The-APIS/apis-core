const router = require('express').Router()
const get = require('lodash/get')
const isEmpty = require('lodash/isEmpty')

const RPC_ADDR_MAP = {
  bitcoin: process.env.BITCOIN_HTTPS_ADDR,
  ethereum: process.env.ETHEREUM_HTTPS_ADDR,
}


module.exports = ({ models, Sequelize, ethereum: { web3, buildContract }, ...context }) => {
  router.post('/', async (req, res, next) => {
    try {
      const { network, options = {} } = req.body

      // TODO - network

      const {
        address,
        privateKey,
      } = web3.eth.accounts.create(get(options, 'passphrase'));

      return res.status(200).json({
        address,
        privateKey,
      })
    } catch (e) {
      console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e] })
    }
  })

  router.get('/', async (req, res, next) => {
    try {
      const {
        network,
        address,
        options = {},
        contracts = [],
        tokens = [],
      } = req.query

      // TODO - network, address for ethereum query

      const erc20TokenContractAddressesArray = isEmpty(contracts) ? [] : Array.isArray(contracts) ? contracts : [contracts]

      const ethBalanceWei = await web3.eth.getBalance(address)
      const ethBalance = web3.utils.fromWei(ethBalanceWei, 'ether')

      const tokenRecords = isEmpty(tokens) ? [] : await models.EthereumContract.findAll({
        where: {
          slug: {
            [Sequelize.Op.in]: Array.isArray(tokens) ? tokens : [],
          },
        },
        raw: true,
      })

      const erc20TokenBalances = (await Promise.all(
        [...tokenRecords.map(r => r.address), ...erc20TokenContractAddressesArray].map(tokenContractAddress => {
          return new Promise(async (resolve, reject) => {
            const contract = buildContract({ type: 'ERC20', address: tokenContractAddress })
            const balance = await contract
              .methods
              .balanceOf(address)
              .call({ from: address })
            const decimals = await contract.methods.decimals().call()
            const slug = ((tokenRecords.find(t => t.address === tokenContractAddress) || {}).slug || '').toUpperCase()
            return resolve({
              [slug || tokenContractAddress]: {
                balance,
                uiBalance: (balance / Math.pow(10, (decimals || 0))).toString(),
              },
            })
          })
        })
      )).reduce((acc, item) => ({ ...acc, ...item }), {})

      return res.status(200).json({
        balances: {
          ETH: {
            balance: ethBalance,
            uiBalance: ethBalance,
          },
          ...erc20TokenBalances,
        },
      })
    } catch (e) {
      console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
