const axios = require('axios')
const { body, validationResult } = require('express-validator');
const router = require('express').Router()


const RPC_ADDR_MAP = {
  bitcoin: process.env.BITCOIN_RPC_ADDR,
  ethereum: process.env.ETHEREUM_RPC_ADDR,
}


module.exports = (context) => {
  router.post('/', [
    body('chain').trim().isIn(['bitcoin', 'ethereum']),
    body('network').trim().isIn(['regtest', 'rinkeby', /* TODO */]),
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

      const { data, status } = await axios.post(`${RPC_ADDR_MAP[chain]}${req.originalUrl}`, req.body)

      return res.status(status).json(data)
    } catch (e) {
      // console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
