const router = require('express').Router()

const v1 = context => {
  router.use('/', require('./v1')(context))
  return router
}

module.exports = ({ ...props }) => {
  router.use('/v1', v1({ ...props }))
  return router
}
