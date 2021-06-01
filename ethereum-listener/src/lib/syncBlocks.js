const syncBlock = require('./syncBlock')
const { getDate } = require("/app/share/lib")
const debug = require('debug')('ethereum-listener:lib:syncBlocks')
const getSyncStartAndEndBlocks = require('./getSyncStartAndEndBlocks')

// TODO share logic with newBlockHeaders to simplify


module.exports = async ({
  startBlockNumber,
  endBlockNumber,
  models,
  sequelize,
  web3,
}) => {
  debug(`Starting block number ${startBlockNumber}`)
  try {

    for ( current = startBlockNumber; current < endBlockNumber; current++) {
      debug(`START syncing block ${current}`)
      await syncBlock({
        blockNumber: current,
        withMethods: true,
        web3,
        models  
      })
      debug(`END syncing block ${current}`)
    }

  } catch (e) {
    console.error(e)
  }
}
