const axios = require('axios')
const { body, validationResult } = require('express-validator');
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
    body('type').trim().isIn(['APIS_ERC20', /* TODO */]),
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

      const { data, status } = await axios.post(`${getRPCServiceAddress({ chain, network })}${req.originalUrl}`, req.body)

      return res.status(status).json(data)
    } catch (e) {
      console.error(`errors.api.v1.tokens`, e)
      return res.status(500).json({ errors: [e.message] })
    }
  })

  return router
}
