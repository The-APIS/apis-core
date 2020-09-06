module.exports = async (
  host = process.env.BITCOIN_ZMQ_HOST,
  port = process.env.BITCOIN_ZMQ_PORT,
  network = process.env.BITCOIN_NETWORK
) => {

  const [
    postgres,
  ] = await Promise.all([
    await require(`@/constructors/postgres`)(),
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
  }

  require('./lib/listener')(context)
  require('./lib/sync')(context)
}
