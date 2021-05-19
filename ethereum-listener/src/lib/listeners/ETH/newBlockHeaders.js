const get = require('lodash/get')
const { syncMethodsForBlockNumber } = require('@/lib/syncMethods')

const subscriptionKey = 'newBlockHeaders'
let lastCalled = null

module.exports = async ({
  models,
  redis,
  web3,
  ethereum,
}) => {
  const subscription = web3.eth.subscribe(subscriptionKey)

  subscription.subscribe((error, blockHeader) => {
    if (error) {
      console.error(`[Daemon][${subscriptionKey}]`, error)
    }
  }).on('data', async (blockHeader) => {
    try {
      const number = get(blockHeader, 'number')
      console.log(`[Daemon][${subscriptionKey}]`, number)
      if (lastCalled === number) return

      lastCalled = number

      const block = await web3.eth.getBlock(get(blockHeader, 'hash'), true) /* true: include transactions */

      await models.EthereumBlock.create(block)

      const transactions = get(block, 'transactions', [])

      if (transactions.length) {
        const txs = await models.EthereumTx.bulkCreate(transactions.map(({ input, ...tx }) => tx))

        const newTxHashes = transactions.map(tx => tx.hash)
        const cachedTxHashes = await redis.hkeysAsync("eth-tx-pending");
        const cachedTxHashesInBlock = cachedTxHashes.filter(cachedTxHash => newTxHashes.indexOf(cachedTxHash) !== -1)

        const result = await redis.multi(cachedTxHashesInBlock.map(k => (['hdel', 'eth-tx-pending', k]))).exec()

        await syncMethodsForBlockNumber({ ethereum, models, blockNumber: block.number })
      }

    } catch (e) {
      console.error(e)
      lastCalled = null
    }
  })
}
