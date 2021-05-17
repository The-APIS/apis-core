const get = require('lodash/get')
const { StaticPool } = require("node-worker-threads-pool")
const debug = require('debug')('ethereum-listener:lib:syncHandler')
const getSyncStartAndEndBlocks = require('./getSyncStartAndEndBlocks')

module.exports = async ({
  models,
  sequelize,
  web3,
}) => {
  const { start, end } = await getSyncStartAndEndBlocks({ models, sequelize, web3, models })

  if ( !(start <= end) ) {
    console.warn(`bad block numbers, cannot sync: Start-> ${start}, End-> ${end}`)
    return
  }

  try {
    const staticPool = new StaticPool({
      size: 4,
      task(startBlockNumber) {
        const syncBlocks = this.require('/app/lib/syncBlocks.js')
        const { sequelize, models } = this.require('/app/share/sequelize')({})
        const web3 = this.require('/app/constructors/web3')

        syncBlocks({
          startBlockNumber,
          models,
          sequelize,
          web3
        })
      }
    });

    debug(`starting sync for blocks between: Start-> ${start}, End-> ${end}`)

    for (let startBlockNumber = start; startBlockNumber <= end; startBlockNumber += 10000) {
      //debug(`syncing 10000 blocks starting from ${current}`)
      staticPool.exec(startBlockNumber)
    }
  } catch (e) {
    console.error(e)
  }
}
