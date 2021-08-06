const path = require('path')
const cors = require('cors')
const express = require('express')


const makeApiRouter = context => {
  const router = require('express').Router()
  router.get('/health', (req, res, next) => res.send({ healthy: true }))
  router.get('/version', (req, res, next) => res.send({ version: require('@/package.json').version }))
  router.use('/v1/rpc', require('./api/v1/rpc')(context))
  router.use('/v1/wallets', require('./api/v1/wallets')(context))
  router.use('/v1/addresses', require('./api/v1/addresses')(context))
  router.use('/v1/transactions', require('./api/v1/transactions')(context))
  router.use('/v1/tokens', require('./api/v1/tokens')(context))
  router.use('/v1/methods', require('./api/v1/methods')(context))
  router.use('/v1/defi', require('./api/v1/defi')(context))
  router.use('/v1/uniswap', require('./api/v1/uniswap')(context))
  return router
}

module.exports = (context = {}) => {
  const router = require('express').Router()
  const apiRouter = makeApiRouter(context)

  if (process.env.NODE_ENV === 'development') {
    router.use('/api', cors(), apiRouter)
  } else {
    router.use('/api', apiRouter)
  }

  router.get('/api/*', (req, res) => res.status(404).send())

  router.get('/health', async (req, res) => {
    return res.status(200).send({ healthy: true })
  })

  router.get('*', (req, res, next) => {
    res.status(404).send()
  })

  return router
}

const router = require('express').Router()

