const get = require('lodash/get')

const subscriptionKey = 'newBlockHeaders'
let lastCalled = null

module.exports = async ({
  host,
  port,
  network,
  sequelize,
  Sequelize,
  models,
  web3,
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

      const block = await web3.eth.getBlock(get(blockHeader,'hash'))

      await models.EthereumBlock.create(block)

      if (get(block, 'transactions', []).length) {
        const txs = await models.EthereumTx.bulkCreate(block.transactions.map(({ input, ...tx }) => tx))
      }

    } catch (e) {
      console.error(e)
      lastCalled = null
    }
  })
}
