const { Client } = require('pg')

const ERROR_CODES = require('./error_codes')

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
    const connectionStringPostgres = url || `postgresql://${user}:${password}@${host}:${port}/postgres`
    console.log('[Postgres] Connecting to postgres...', connectionString)
    let client
    let pgInterface
    console.log(`[Postgres] Connected to host ${host}`)
    try {
      console.log(`[Postgres] Creating database "${database}"...`)
      client = new Client({ connectionString })
      pgInterface = await client.connect()
    } catch (e) {
      if (e.code === ERROR_CODES.invalid_catalog_name) {
        try {
          client = new Client({ connectionString: connectionStringPostgres })
          pgInterface = await client.connect()
          const createdResponse = await client.query(`CREATE DATABASE "${database}"`)
          console.log('createdResponse', createdResponse)
          console.log(`[Postgres] Created database "${database}"`)
        } catch (e) {
          console.error(e);
          console.error(e.SequelizeConnectionError);
          console.error(e.error);
        }
      }
    }
    return pgInterface
  } catch (e) {
    onError(e)
    await sleep(interval)
    if (attempts === 0) return onError()
    return run(attempts, interval, onError)
  }
}


module.exports = run
