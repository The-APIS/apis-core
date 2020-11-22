const axios = require('axios')
const router = require('express').Router()


module.exports = (context) => {
  router.get('*', async (req, res, next) => {
    try {
      const { data, status } = await axios.get(`${process.env.ETHEREUM_RPC_SVC_ADDR}${req.originalUrl.replace(/\/api\/v1\/ethereum\//gi, '/api/v1/')}`)
      return res.status(status).json(data)
    } catch (e) {
      console.error(`errors.api.v1.ethereum`, e)
      return res.status(500).json({ errors: [e.message] })
    }
  })

  router.post('*', async (req, res, next) => {
    try {
      const { data, status } = await axios.post(`${process.env.ETHEREUM_RPC_SVC_ADDR}${req.originalUrl.replace(/\/api\/v1\/ethereum\//gi, '/api/v1/')}`)
      return res.status(status).json(data)
    } catch (e) {
      console.error(`errors.api.v1.ethereum`, e)
      return res.status(500).json({ errors: [e.message] })
    }
  })

  return router
}
