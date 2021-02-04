const { Client } = require('pg')

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))


const run = async (
  attempts = Infinity,
  interval = 3000,
  onError = (e) => console.error('[Postgres] Connection Error', e),
  host = process.env.POSTGRES_HOST || '127.0.0.1',
  port = process.env.POSTGRES_PORT || 5432,
  database = process.env.POSTGRES_DATABASE || 'postgres',
  user = process.env.POSTGRES_USER || 'postgres',
  password = process.env.POSTGRES_PASSWORD || 'password',
  url = null
) => {
  try {
    const connectionString = url || `postgresql://${user}:${password}@${host}:${port}/${database}`
    console.log('[Postgres] Connecting to postgres...', connectionString)
    const client = new Client({ connectionString })

    const pgInterface = await client.connect()
    console.log(`[Postgres] Connected to host ${host}`)
    return pgInterface
  } catch (e) {
    onError(e)
    await sleep(interval)
    if (attempts === 0) return onError()
    return run(attempts, interval, onError)
  }
}

module.exports = run
