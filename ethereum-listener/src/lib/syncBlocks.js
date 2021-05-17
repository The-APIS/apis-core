const syncBlock = require('./syncBlock')
const debug = require('debug')('ethereum-listener:lib:syncBlocks')
const getSyncStartAndEndBlocks = require('./getSyncStartAndEndBlocks')

// TODO share logic with newBlockHeaders to simplify


module.exports = async ({
  startBlockNumber,
  models,
  sequelize,
  web3,
}) => {
  console.log(`Starting block number ${startBlockNumber}`)
  try {
    let end = startBlockNumber + 10000;

    for ( current = startBlockNumber; current < end; current++) {
      console.log(`syncing block ${current}`)
      await syncBlock({
        blockNumber: current,
        withMethods: true,
        web3,
        models
      })
    }

  } catch (e) {
    console.error(e)
  }
}
