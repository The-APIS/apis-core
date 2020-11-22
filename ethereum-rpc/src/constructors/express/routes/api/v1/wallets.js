const router = require('express').Router()
const get = require('lodash/get')

const RPC_ADDR_MAP = {
  bitcoin: process.env.BITCOIN_HTTPS_ADDR,
  ethereum: process.env.ETHEREUM_HTTPS_ADDR,
}


module.exports = ({ ethereum: { web3, buildContract }, ...context }) => {
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
        erc20TokenContractAddresses = [],
        tokens = [], // TODO
      } = req.query

      console.log('req.query', req.query)

      // TODO - network, address for ethereum query

      const erc20TokenContractAddressesArray = Array.isArray(erc20TokenContractAddresses) ?
        [...erc20TokenContractAddresses] : [erc20TokenContractAddresses]

      const ethBalanceWei = await web3.eth.getBalance(address)
      const ethBalance = web3.utils.fromWei(ethBalanceWei, 'ether')

      const erc20TokenBalances = (await Promise.all(
        erc20TokenContractAddressesArray.map(tokenContractAddress => {
          console.log('tokenContractAddress: ', tokenContractAddress)
          return new Promise(async (resolve, reject) => {
            const contract = buildContract({ type: 'ERC20', address: tokenContractAddress })
            console.log('contract', contract)
            const balance = await contract
                .methods
                .balanceOf(address)
                .call({ from: address })
            console.log('balance', balance)
            const decimals = await contract.methods.decimals().call()
            console.log('decimals', decimals)
            return resolve({
              [tokenContractAddress]: {
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
