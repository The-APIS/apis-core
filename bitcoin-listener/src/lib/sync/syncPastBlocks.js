const get = require('lodash/get')
const client = require('@/constructors/bitcoin-core')

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))


module.exports = async ({
  host,
  port,
  network,
  sequelize,
  Sequelize,
  models,
  redis,
}) => {
  try {
    const latestBlock = await models.BitcoinBlock.findOne({
      limit: 1,
      order: [ [ 'height', 'DESC' ]],
    })

    // TOOD - confirm all blocks exist in db

    const start = get(latestBlock, 'height', -1) + 1
    const end = await client.getBlockCount() || 0

    let current = start
    let retries = 5

    while (current <= end) {
      try {
        const currentHash = await client.getBlockHash(current)
        const block = await client.getBlock(currentHash, 2) /* verbosity = 2: include transactions */
        const { difficulty, ...values } = block

        await models.BitcoinBlock.create(block)

        if (get(block, 'tx', []).length) {
          const txs = await models.BitcoinTx.bulkCreate(block.tx.map(tx => ({ blockHash: currentHash, ...tx })))
          const delResult = await redis.multi(block.tx.map(tx => (['hdel', 'eth-tx-pending', tx.hash]))).exec()
          console.log(`[Daemon][syncPastBlocks] delResult: `, delResult)
        }

        current += 1
        retries = 5
      } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
          console.log('[syncPastBlocks] Skipping Block Insertion - Record Already Exists.')
          current += 1
          retries = 5
        } else {
          console.error(e)
          retries -= 1
          if (retries < 0) curent += 1
          await sleep(2 / retries * 1000)
        }
      }
    }

  } catch (e) {
    console.error(e)
  }

}
