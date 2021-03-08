const bluebird = require('bluebird')
const { createClient, RedisClient, Multi } = require('redis')

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))

module.exports = async (
  attempts = Infinity,
  interval = 3000,
  onError = (e) => console.error('[Redis] Connection Error', e),
  ...options
) => {
  try {
    const url = process.env.REDIS_URL || `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    console.log(`[Redis] Connecting to redis host ${url}...`)

    /* Use promises for Redis methods */
    bluebird.promisifyAll(RedisClient.prototype)
    bluebird.promisifyAll(Multi.prototype)

    const client = await createClient({
      url: process.env.REDIS_URL,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      prefix: process.env.REDIS_PREFIX,
      ...options
    })

    client.on('error', err => console.error('[Redis] Error:', err))

    console.log('[Redis] Connected.')
    return client
  } catch (e) {
    onError(e)
    await sleep(interval)
    if (attempts === 0) return onError()
    return run(attempts, interval, onError)
  }
}
