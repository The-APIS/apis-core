const path = require('path')
const cors = require('cors')
const router = require('express').Router()

module.exports = (context = {}) => {
  const APIRouter = require('./api')(context)

  router.use('/api', (req, res, next) => {
    console.log('TODO - authenticate...')
    next()
  })

  if (process.env.NODE_ENV === 'development') {
    router.use('/api', cors(), APIRouter)
  } else {
    router.use('/api', APIRouter)
  }

  router.get('/api/*', (req, res) => res.status(404).send())

  router.get('/health', async (req, res) => {
    return res.status(200).send({ health: 'HEALTHY' })
  })

  router.get('*', (req, res, next) => {
    res.status(404).send()
  })

  return router
}
