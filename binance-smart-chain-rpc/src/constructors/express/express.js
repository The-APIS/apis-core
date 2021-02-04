const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const apicache = require('apicache')


module.exports = async (context) => {
  const app = express()
  const cache = apicache.options({ redisClient: context.redis }).middleware
  app.disable('x-powered-by')
  app.use(morgan('combined'))
  app.use(bodyParser.json({ limit: '50mb', extended: true }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  // app.use(cache(`${process.env.GLOBAL_API_CACHE_MINUTES || 5} minutes`))
  app.use('/', require('./routes')({ cache, ...context }))
  return app
}
