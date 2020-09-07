const web3 = require('@/constructors/web3')

// Allow for clean nodemon restarts (see https://github.com/remy/nodemon/issues/1025#issuecomment-308049864)
process.on('SIGINT', () => {
  process.exit()
})

process.on('uncaughtException', (e) => {
  console.error(`[ethereum-listener] unhandled exception: ${e.message} ${e}`)
})


module.exports = async () => {
  console.info('[ethereum-listener] Starting...')
  try {
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
      // host,
      // port,
      // network,
      sequelize,
      Sequelize,
      models,
      postgres,
      web3,
    }

    require('./lib/listeners/ETH/newBlockHeaders')(context)
    require('./lib/listeners/ETH/pendingTransactions')(context)
    require('./lib/sync')(context)
  } catch (e) {
    console.error('[ethereum-listener] Error.')
    console.error(e)
  }
}
