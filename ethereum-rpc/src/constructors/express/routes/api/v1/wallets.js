const router = require('express').Router()
const web3 = require('@/constructors/web3')
const get = require('lodash/get')

const RPC_ADDR_MAP = {
  bitcoin: process.env.BITCOIN_HTTPS_ADDR,
  ethereum: process.env.ETHEREUM_HTTPS_ADDR,
}


module.exports = (context) => {
  router.post('/', async (req, res, next) => {
    try {
      const { network, options = {} } = req.body

      const {
        address,
        privateKey,
        ...rest
      } = web3.eth.accounts.create(get(options, 'passphrase'));

      console.log(address,
        privateKey,
      rest)

      return res.status(200).json({
        address,
        privateKey,
      })
    } catch (e) {
      console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
