const router = require('express').Router()


module.exports = (context) => {
  router.use('/bitcoin', require('./bitcoin')(context))
  router.use('/ethereum', require('./ethereum')(context))
  return router
}
