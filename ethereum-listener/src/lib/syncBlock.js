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

    if (!block 
          || !get(block, 'number')
          || !get(block, 'hash')) 
    {
      throw new Error(`Cannot sync block: ${blockNumber}`)
    }

    await models.EthereumBlock.create(block)

    if (withMethods !== false && get(block, 'transactions', []).length) {
      await models.EthereumTx.bulkCreate(block.transactions)
      await syncMethodsForBlockNumber({
        models,
        web3,
        ethereum,
        blockNumber: blockNumber,
      })
    }

  } catch (e) {
    //log block numbers when it fails
    console.error(e.message)
  }
}
