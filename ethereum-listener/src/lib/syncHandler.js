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

  const blockStep = process.env.BLOCK_STEP_COUNT
  const noOfCores = parseInt(process.env.NUMBER_OF_CORES) || 1

  debug(`number of blocks processed by each worker: ${blockStep}`)
  debug(`number of cores for multi indexing: ${noOfCores}`)

  try {
    const staticPool = new StaticPool({
      size: noOfCores,
      shareEnv: process.env.WORKER_POOL_SHARE_ENV === 'true',
      task(startBlockNumber) {
        const syncBlocks = this.require('/app/lib/syncBlocks.js')
        const { sequelize, models } = this.require('/app/share/sequelize')({
          host: process.env.POSTGRES_HOST || '127.0.0.1',
          port: parseInt(process.env.POSTGRES_PORT || 5432),
          database: process.env.POSTGRES_DATABASE || 'postgres',
          dialect: process.env.POSTGRES_DIALECT || 'postgres',
          user: process.env.POSTGRES_USER || 'postgres',
          password: process.env.POSTGRES_PASSWORD || 'password',
          poolMax: parseInt(process.env.SEQUELIZE_WORKER_POOL_MAX || 10),
          poolMin: parseInt(process.env.SEQUELIZE_WORKER_POOL_MIN || 0),
          poolAcquire: parseInt(process.env.SEQUELIZE_WORKER_POOL_ACQUIRE || 30000),
          poolIdle: parseInt(process.env.SEQUELIZE_WORKER_POOL_IDLE || 10000),
        })

        const web3 = this.require('/app/constructors/web3')

        debug(`syncing blocks starting from ${startBlockNumber}`)
        syncBlocks({
          startBlockNumber,
          models,
          sequelize,
          web3
        })
      }
    });

    debug(`starting sync for blocks between: Start-> ${start}, End-> ${end}`)

    for (let startBlockNumber = start; startBlockNumber <= end; startBlockNumber += blockStep) {
      staticPool.exec(startBlockNumber)
    }
  } catch (e) {
    console.error(e)
  }
}
