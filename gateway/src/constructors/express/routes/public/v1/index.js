
const router = require('express').Router()

module.exports = (context) => {
 router.use('/apikeys', require('./apiKeys')(context))
 return router
}