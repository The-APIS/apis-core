const http = require('http')
const express = require('./express')
const EXPRESS_PORT = process.env.EXPRESS_PORT || 8003


const run = async (context = {}) => {
  console.log('[Express] Creating Express app.')
  const app = await express(context)
  const httpServer = http.createServer(app)

  httpServer.listen(EXPRESS_PORT, async () => {
    console.log(`[Express] Server listening on EXPRESS_PORT ${EXPRESS_PORT}`)
  })

  return app
}

module.exports = run
