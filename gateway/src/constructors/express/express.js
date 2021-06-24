const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

module.exports = async ({ io,...context }) => {
  const app = express()
  app.disable('x-powered-by')
  app.use(morgan('combined'))
  app.use(bodyParser.json({ limit: '50mb', extended: true }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  app.use(cors())
  app.use('/', require('./routes')({context}))
  return app
}
