
const router = require('express').Router()


module.exports = ({...context}) => {
 router.use('/apiKeys', require('./apiKeys')(context))
 return router
}