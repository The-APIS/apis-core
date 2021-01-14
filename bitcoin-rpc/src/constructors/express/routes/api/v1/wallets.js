const Client = require('bitcoin-core');
const router = require('express').Router()
const get = require('lodash/get')


module.exports = (context) => {
  router.post('/', async (req, res, next) => {
    try {
      const { network, options = {} } = req.body

      const bitcoinCoreOptions = {
        network,
        host: process.env.BITCOIN_HTTPS_ADDR.replace(/http(|s):\/\//gi, ''),
        version: process.env.BITCOIN_CORE_VERSION,
        username: process.env.BITCOIN_CORE_USER,
        password: process.env.BITCOIN_CORE_PASS,
        port: process.env.BITCOIN_CORE_PORT,
      }

      if (process.env.BITCOIN_HTTPS_ADDR.match(/https:\/\//gi)) {
        bitcoinCoreOptions.ssl = {
          enabled: true,
          strict: false
        }
      }

      const client = new Client({ ...bitcoinCoreOptions });

      const address = await client.getNewAddress()
      const privateKey = await client.dumpPrivKey(address)

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
