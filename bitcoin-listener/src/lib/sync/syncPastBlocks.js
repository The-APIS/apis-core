const get = require('lodash/get')
const bitcoin = require('bitcoinjs-lib')
const client = require('@/constructors/bitcoin-core')

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))


module.exports = async ({
  host,
  port,
  network,
  sequelize,
  Sequelize,
  models,
}) => {
    const latestBlock = await models.BitcoinBlock.findOne({
      limit: 1,
      order: [ [ 'height', 'DESC' ]]
    })

    // TOOD - confirm all blocks exist in db

    const start = get(latestBlock, 'height', -1) + 1
    const end = await client.getBlockCount() || 0

    let current = start
    let retries = 3

    while (current <= end) {
      try {
        const currentHash = await client.getBlockHash(current)
        const block = await client.getBlock(currentHash, 2) /* verbosity = 2: include transactions */
        await models.BitcoinBlock.create(block)

        if (get(block, 'tx', []).length) {
          const txs = await models.BitcoinTx.bulkCreate(block.tx.map(tx => ({ blockHash: currentHash, ...tx })))
        }

        current += 1;
        retries = 3;
      } catch (e) {
        console.error(e)
        retries = retries - 1;
        if (retries < 0) process.exit(1)
        sleep(3 / retries)
      }
    }

}
