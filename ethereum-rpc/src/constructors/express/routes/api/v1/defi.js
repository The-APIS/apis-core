const axios = require('axios')
const router = require('express').Router()


module.exports = ({ models, ...context }) => {

  router.get('/rates', async (req, res, next) => {
    try {
      const { status, data } = await axios.get('https://api.rates.dev.titans.finance/api/v1/rates')
      return res.status(status).json({ rates: data })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  router.get('/compound/*', async (req, res, next) => {
    try {
      const { status, data } = await axios.get(`https://api.compound.finance/api/v2${req.originalUrl.replace(/api\/v1\/query\/defi\/compound\//gi, '')}`)
      return res.status(status).json({ rates: data })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
