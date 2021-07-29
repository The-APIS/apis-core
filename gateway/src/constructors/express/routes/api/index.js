const router = require('express').Router()

const v1 = context => {
  router.use('/rpc', require('./v1/rpc')(context))
  router.use('/wallets', require('./v1/wallets')(context))
  router.use('/transactions', require('./v1/transactions')(context))
  router.use('/tokens', require('./v1/tokens')(context))
  router.use('/ethereum', require('./v1/ethereum')(context))
  router.use('/uniswap', require('./v1/swap')(context))
  return router
}

module.exports = ({ ...props }) => {
  router.get('/health', (req, res, next) => res.send({ healthy: true }))
  router.get('/version', (req, res, next) => res.send({ version: require('@/package.json').version }))
  router.use('/v1', v1({ ...props }))
  return router
}
