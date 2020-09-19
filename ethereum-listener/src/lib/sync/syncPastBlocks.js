const get = require('lodash/get')

module.exports = async ({
  sequelize,
  Sequelize,
  models,
  web3,
}) => {
  try {
    const latestBlock = await models.EthereumBlock.findOne({
      limit: 1,
      order: [ [ 'number', 'DESC' ]]
    })

    // TOOD - confirm all blocks exist in db

    const start = Math.max(get(latestBlock, 'number', -1), (process.env.ETHEREUM_MIN_BLOCK_NUMBER || 0))
    const end = await web3.eth.getBlockNumber() || 0
    let current = start

    while (current <= end) {
      const block = await web3.eth.getBlock(current, true) /* true: include transactions */

      await models.EthereumBlock.create(block)

      if (get(block, 'transactions', []).length) {
        const txs = await models.EthereumTx.bulkCreate(block.transactions) => tx))
      }

      current += 1;
    }

  } catch (e) {
    console.error(e)
  }
}
