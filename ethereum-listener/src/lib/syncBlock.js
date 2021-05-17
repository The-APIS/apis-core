const get = require('lodash/get')
const ethereum = require('/app/constructors/ethereum')
const { syncMethodsForBlockNumber } = require('./syncMethods')
const debug = require('debug')('ethereum-listener:lib:syncBlock')


module.exports = async ({
  blockNumber,
  withMethods = true,
  web3,
  models,
}) => {
  if (!blockNumber && blockNumber !== 0) {
    console.warn('Expected blockNumber, received ', blockNumber)
    return
  }

  try {
    const block = await web3.eth.getBlock(blockNumber, true) /* true: include transactions */

    await models.EthereumBlock.create(block)

    if (withMethods !== false && get(block, 'transactions', []).length) {
      const txs = await models.EthereumTx.bulkCreate(block.transactions)
      await syncMethodsForBlockNumber({
        models,
        web3,
        ethereum,
        blockNumber: blockNumber,
      })
    }

  } catch (e) {
    console.error(e)
  }
}
