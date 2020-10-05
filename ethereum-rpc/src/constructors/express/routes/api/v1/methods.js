const axios = require('axios')
const router = require('express').Router()


module.exports = ({ models, ...context }) => {

  router.get('/', async (req, res, next) => {
    try {
      const {
        limit = 100,
        offset = 0,
        ...query
      } = req.query

      const methods = await models.EthereumMethod.findAll({
        where: {
          ...query
        },
        limit: Math.min(limit, 1000),
        offset,
      })

      return res.status(200).json({
        data: methods,
      })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}