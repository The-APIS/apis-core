const axios = require('axios')
const { body, validationResult } = require('express-validator');
const router = require('express').Router()


const RPC_ADDR_MAP = {
  bitcoin: process.env.BITCOIN_RPC_SVC_ADDR,
  ethereum: process.env.ETHEREUM_RPC_SVC_ADDR,
}


module.exports = (context) => {
  router.post('/', [
    body('chain').trim().isIn(['bitcoin', 'ethereum']),
    body('network').trim().isIn(['regtest', 'rinkeby', 'mainnet', /* TODO */]),
    body('type').trim().isIn(['ERC20', 'ERC721', /* TODO */]),
    body('sender').trim().isString(),
    // body('token').shape(), // TODO
    body('privateKey').trim().isString(),
  ], async (req, res, next) => {

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { chain, network, options = {} } = req.body

      const { data, status } = await axios.post(`${RPC_ADDR_MAP[chain]}${req.originalUrl}`, req.body)

      return res.status(status).json(data)
    } catch (e) {
      console.error(`errors.api.v1.tokens`, e)
      return res.status(500).json({ errors: [e.message] })
    }
  })

  return router
}
