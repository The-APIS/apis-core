const get = require('lodash/get')
const ethereum = require('@/constructors/ethereum')
const { syncMethodsForBlockNumber } = require('./syncMethods')

// TODO share logic with newBlockHeaders to simplify


module.exports = async ({
  models,
  web3,
}) => {
  try {
    const minBlockNumber = parseInt(process.env.ETHEREUM_MIN_BLOCK_NUMBER) || 0
    console.log('[ethereum-listener][syncBlocks] default block is ', minBlockNumber)
    const latestBlock = await models.EthereumBlock.findOne({
      limit: 1,
      order: [[ 'number', 'DESC' ]],
    })
    console.log('[ethereum-listener][syncBlocks] latest block is ', get(latestBlock, 'number', -1))
    // TOOD - confirm all blocks exist in db

    const start = Math.max(get(latestBlock, 'number', -1), minBlockNumber)
    console.log('[ethereum-listener][syncBlocks] start block is ', start)
    const end = await web3.eth.getBlockNumber() || 0
    console.log('[ethereum-listener][syncBlocks] end block is ', end)
    let current = start

    while (current <= end) {
      console.error(`[ethereum-listener][syncBlocks] syncing block ${current}`)
      try {
        const block = await web3.eth.getBlock(current, true) /* true: include transactions */

        await models.EthereumBlock.create(block)

        if (get(block, 'transactions', []).length) {
          const txs = await models.EthereumTx.bulkCreate(block.transactions)
          await syncMethodsForBlockNumber({
            models,
            web3,
            ethereum,
            blockNumber: current,
          })
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
