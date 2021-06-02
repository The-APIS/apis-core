const router = require('express').Router()


module.exports = (context) => {
  router.use('/bitcoin', require('./rpcHandler')(context))
  router.use('/ethereum', require('./rpcHandler')(context))
  router.use('/bsc', require('./rpcHandler')(context))
  router.use('/binance-smart-chain', require('./rpcHandler')(context))


  return router
}
