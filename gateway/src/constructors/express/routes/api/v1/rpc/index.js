const router = require('express').Router()
const bsc = require('./bsc')

module.exports = (context) => {
  router.use('/bitcoin', require('./bitcoin')(context))
  router.use('/ethereum', require('./ethereum')(context))
  router.use('/bsc', bsc(context))
  router.use('/binance-smart-chain', bsc(context))
  return router
}
