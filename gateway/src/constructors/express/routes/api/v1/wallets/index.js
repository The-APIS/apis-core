const axios = require('axios')
const { query, body, validationResult, ...rest } = require('express-validator');
const router = require('express').Router()


const RPC_ADDR_MAP = {
  bitcoin: process.env.BITCOIN_RPC_SVC_ADDR,
  ethereum: process.env.ETHEREUM_RPC_SVC_ADDR,
  binance_smart_chain: process.env.BINANCE_SMART_CHAIN_RPC_SVC_ADDR,
}

// const getRpcAddr = (chain, network) => {
//   if (!chain || !network) throw new Error('Invalid chain or network')

// }


module.exports = (context) => {
  router.post('/', [
    body('chain').trim().isIn(['bitcoin', 'ethereum', 'binance_smart_chain']),
    body('network').trim().isIn(['regtest', 'rinkeby', 'mainnet', 'testnet' /* TODO */]),
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
      console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e.message] })
    }
  })

  router.get('/', [
    query('chain').trim().isIn(['bitcoin', 'ethereum', 'binance_smart_chain']),
    query('network').trim().isIn(['regtest', 'rinkeby', 'mainnet', 'testnet' /* TODO */]),
  ], async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { chain, network, options = {} } = req.query

      const { data, status } = await axios.get(`${RPC_ADDR_MAP[chain]}${req.originalUrl}`)

      return res.status(status).json(data)
    } catch (e) {
      console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e.message] })
    }
  })

  return router
}
