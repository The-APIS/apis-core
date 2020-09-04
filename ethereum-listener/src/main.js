const web3 = require('@/constructors/web3')

// Allow for clean nodemon restarts (see https://github.com/remy/nodemon/issues/1025#issuecomment-308049864)
process.on('SIGINT', () => {
  process.exit()
})

process.on('uncaughtException', (e) => {
  console.error(`[ethereum-listener] unhandled exception: ${e.message} ${e}`)
})

const run = async () => {
  console.info('[ethereum-listener] Starting...')
  try {
    require('./listeners/ETH/newBlockHeaders')({ web3 })
    require('./listeners/ETH/pendingTransactions')({ web3 })
  } catch (e) {
    console.error('[ethereum-listener] Error.')
    console.error(e)
  }
}

module.exports.run = run
