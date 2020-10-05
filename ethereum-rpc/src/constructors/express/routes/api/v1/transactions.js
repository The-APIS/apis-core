const axios = require('axios')
const router = require('express').Router()


module.exports = ({ models, ...context }) => {

  router.get('/transactions', async (req, res, next) => {

    // TODO - devise query interface and strategy

    try {
      const {
        token,
        tokenAddress,
        toAddress,
        fromAddress,
        method,
        limit = 100,
        // ...
      } = req.query

      const { status, data } = await models.EthereumTx.findAll({
        where: {
          ...req.query,
        },
        limit,
      })

      return res.status(200).json({
        ...req.query,
      })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
