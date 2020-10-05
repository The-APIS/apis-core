const get = require('lodash/get')

// TODO share logic with newBlockHeaders to simplify


module.exports = async ({
  models,
  web3,
}) => {
  try {
    console.log('[ethereum-listener][syncPastBlocks] default block is ', process.env.ETHEREUM_MIN_BLOCK_NUMBER || 0)
    const latestBlock = await models.EthereumBlock.findOne({
      limit: 1,
      order: [[ 'number', 'DESC' ]],
    })
    console.log('[ethereum-listener][syncPastBlocks] latest block is ', get(latestBlock, 'number', -1))
    // TOOD - confirm all blocks exist in db

    const start = Math.max(get(latestBlock, 'number', -1), (process.env.ETHEREUM_MIN_BLOCK_NUMBER || 0))
    console.log('[ethereum-listener] start block is ', start)
    const end = await web3.eth.getBlockNumber() || 0
    console.log('[ethereum-listener] end block is ', end)
    let current = start

    while (current <= end) {
      console.error(`[ethereum-listener][syncPastBlocks] syncing block ${current}`)
      try {
        const block = await web3.eth.getBlock(current, true) /* true: include transactions */

        await models.EthereumBlock.create(block)

        if (get(block, 'transactions', []).length) {
          const txs = await models.EthereumTx.bulkCreate(block.transactions)
        }

      } catch (e) {
        console.error(e)
      }
      current += 1;
    }

  } catch (e) {
    console.error(e)
  }
}
