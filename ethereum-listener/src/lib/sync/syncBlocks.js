const syncBlock = require('./syncBlock')
const debug = require('debug')('ethereum-listener:lib:sync:syncBlocks')
const getSyncStartAndEndBlocks = require('../getSyncStartAndEndBlocks')

// TODO share logic with newBlockHeaders to simplify


module.exports = async ({
  models,
  sequelize,
  web3,
}) => {
  try {
    const { start, end } = await getSyncStartAndEndBlocks({ models, sequelize, web3, models })

    let current = start

    while (current <= end) {
      debug(`syncing block ${current}`)
      await syncBlock({ blockNumber: current, withMethods: true, web3, models })
      current += 1;
    }

  } catch (e) {
    console.error(e)
  }
}
