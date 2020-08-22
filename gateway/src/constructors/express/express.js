const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = async ({ io }) => {
  const app = express()
  app.use(bodyParser.json({ limit: '50mb', extended: true }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  app.disable('x-powered-by')
  app.use('/', require('./routes')({}))
  return app
}
