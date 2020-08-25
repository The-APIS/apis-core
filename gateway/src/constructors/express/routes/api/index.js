const router = require('express').Router()

const v1 = context => {
  router.use('/commands', require('./v1/commands')(context))
  router.use('/rpc', require('./v1/rpc')(context))
  return router
}

module.exports = ({ ...props }) => {
  router.get('/health', (req, res, next) => res.send({ healthy: true }))
  router.get('/version', (req, res, next) => res.send({ version: require('@/package.json').version }))
  router.use('/v1', v1({ ...props }))
  return router
}
