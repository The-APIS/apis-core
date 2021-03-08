module.exports = async (
  host = process.env.BITCOIN_ZMQ_HOST,
  port = process.env.BITCOIN_ZMQ_PORT,
  network = process.env.BITCOIN_NETWORK
) => {

  const [
    postgres,
    redis,
  ] = await Promise.all([
    await require(`@/share/constructors/postgres`)(),
    await require(`@/share/constructors/redis`)({
      url: process.env.REDIS_URL,
      prefix: 'bitcoin-listener',
    }),
  ])

  const {
    sequelize,
    Sequelize,
    models,
  } = require('@/constructors/sequelize')({})

  const context = {
    host,
    port,
    network,
    sequelize,
    Sequelize,
    models,
    postgres,
    redis,
  }

  if (process.env.MIGRATE_ON_BOOTSTRAP === 'true') await require('@/share/bin/sequelizeMigrate')()

  require('./lib/listener')(context)

  require('./lib/sync/syncPastBlocks')(context)
  require('./lib/sync/syncPendingTransactions')(context)
}
