const router = require('express').Router()
// const web3 = require('@/constructors/web3')
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

      console.log('erc20TokenContractAddressesArray', erc20TokenContractAddressesArray)

      const balanceWei = await web3.eth.getBalance(address)
      const balances = {
        ETH: web3.utils.fromWei(balanceWei, 'ether'),
      }

      console.log('balanceWei', balanceWei, balances)

      const erc20TokenBalances = (await Promise.all(
        erc20TokenContractAddressesArray.map(tokenContractAddress => {
          console.log('tokenContractAddress: ', tokenContractAddress)
          return buildContract({ type: 'ERC20', address: tokenContractAddress })
            .methods
            .balanceOf(address)
            .call({ from: address })
        })
      )).map((balance, i) => ({ [erc20TokenContractAddressesArray[i]]: balance }))

      console.log('erc20TokenBalances', erc20TokenBalances)

      return res.status(200).json({
        balances,
        erc20TokenBalances,
      })
    } catch (e) {
      console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
