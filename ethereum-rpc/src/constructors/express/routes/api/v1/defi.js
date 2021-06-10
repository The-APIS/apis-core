const axios = require('axios')
const router = require('express').Router()


module.exports = ({ models, ...context }) => {

  router.get('/rates', async (req, res, next) => {
    try {
      const { status, data } = await axios.get(process.env.DEFI_RATES_ADDR)
      return res.status(status).json({
        data: {
          rates: data,
        },
      })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  router.get('/compound/*', async (req, res, next) => {
    try {
      const { status, data } = await axios.get(`${process.env.COMPOUND_RATES_ADDR}${req.originalUrl.replace(/api\/v1\/query\/defi\/compound\//gi, '')}`)
      return res.status(status).json({ rates: data })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
