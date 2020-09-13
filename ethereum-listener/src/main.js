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
      redis,
    ] = await Promise.all([
      await require(`@/constructors/postgres`)(),
      await require(`@/constructors/redis`)({
        url: process.env.REDIS_URL,
        prefix: 'ethereum-listener',
      }),
    ])

    const {
      sequelize,
      Sequelize,
      models,
    } = require('@/constructors/sequelize')({})

    const context = {
      sequelize,
      Sequelize,
      models,
      postgres,
      redis,
      web3,
    }

    require('./lib/listeners/ETH/newBlockHeaders')(context)
    require('./lib/listeners/ETH/pendingTransactions')(context)

    require('./lib/sync/syncPastBlocks')(context)
    require('./lib/sync/syncPendingTransactions')(context)
  } catch (e) {
    console.error('[ethereum-listener] Error.')
    console.error(e)
  }
}
