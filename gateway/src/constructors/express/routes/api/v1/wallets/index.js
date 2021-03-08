const axios = require('axios')
const { query, body, validationResult, ...rest } = require('express-validator');
const router = require('express').Router()
const {
  getRPCServiceAddress,
} = require('@/share/lib')
const {
  SUPPORTED_CHAINS,
  SUPPORTED_NETWORKS,
} = require('@/share/constants')


module.exports = (context) => {
  router.post('/', [
    body('chain').trim().isIn(SUPPORTED_CHAINS),
    body('network').trim().isIn(SUPPORTED_NETWORKS),
  ], async (req, res, next) => {
    // {
    //   "chain",
    //   "network",
    //   "options": { # optional @obj: [ ... ]
    //     "label": null, # BTC optional: @string
    //     "address_type": null, # BTC optional: @string "legacy" | "p2sh-segwit" | "bech32"
    //     "passphrase": null # ETH optional: @string
    //   }
    // }
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { chain, network, options = {} } = req.body

      const { data, status } = await axios.post(`${getRPCServiceAddress({ chain, network })}${req.originalUrl}`, req.body)

      return res.status(status).json(data)
    } catch (e) {
      console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e.message] })
    }
  })

  router.get('/', [
    query('chain').trim().isIn(SUPPORTED_CHAINS),
    query('network').trim().isIn(SUPPORTED_NETWORKS),
  ], async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { chain, network, options = {} } = req.query

      const { data, status } = await axios.get(`${getRPCServiceAddress({ chain, network })}${req.originalUrl}`, req.body)

      return res.status(status).json(data)
    } catch (e) {
      console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e.message] })
    }
  })

  return router
}
