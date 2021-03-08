const axios = require('axios')
const router = require('express').Router()

const {
  getRPCServiceAddress,
} = require('@/share/lib')

const {
  SUPPORTED_CHAINS,
  SUPPORTED_NETWORKS,
} = require('@/share/constants')


module.exports = (context) => {
  router.get('*', async (req, res, next) => {
    try {
      const route = `${getRPCServiceAddress({
        chain: 'ethereum',
        network: req.query.network || 'rinkeby',
      })}${req.originalUrl.replace(/\/api\/v1\/ethereum\//gi, '/api/v1/')}`
      const { data, status } = await axios.get(route)
      return res.status(status).json(data)
    } catch (e) {
      console.error(`errors.api.v1.ethereum`, e)
      return res.status(500).json({ errors: [e.message] })
    }
  })

  router.post('*', async (req, res, next) => {
    try {
      const route = `${getRPCServiceAddress({
        chain: 'ethereum',
        network: req.query.network || 'rinkeby',
      })}${req.originalUrl.replace(/\/api\/v1\/ethereum\//gi, '/api/v1/')}`
      const { data, status } = await axios.post(route)
      return res.status(status).json(data)
    } catch (e) {
      console.error(`errors.api.v1.ethereum`, e)
      return res.status(500).json({ errors: [e.message] })
    }
  })

  return router
}
