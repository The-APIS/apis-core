const router = require('express').Router()


module.exports = (context) => {
  router.use('/bitcoin', require('./chainHandler')(context))
  router.use('/ethereum', require('./chainHandler')(context))
  router.use('/bsc', require('./chainHandler')(context))
  router.use('/binance-smart-chain', require('./chainHandler')(context))


  return router
}
