const get = require('lodash/get')
const isEmpty = require('lodash/isEmpty')
const debug = require('debug')('ethereum-listener:lib:getSyncStartAndEndBlocks')


module.exports = async ({ models, sequelize, web3 }) => {
  try {
    const minBlockNumber = parseInt(process.env.ETHEREUM_MIN_BLOCK_NUMBER) || 0

    debug('default block: ', minBlockNumber)

    const latestBlock = await models.EthereumBlock.findOne({
      limit: 1,
      order: [[ 'number', 'DESC' ]],
    })

    const latestBlockNumber = get(latestBlock, 'number', -1)
    debug('latest block: ', latestBlockNumber)

    // Fetch earliest missing block in db
    const [earliestMissingBlockNumberResult, metadata] = await sequelize.query(`
      SELECT s.i AS earliest_missing_block_number
      FROM generate_series(${minBlockNumber}, ${latestBlockNumber}) s(i)
      WHERE NOT EXISTS (SELECT 1 FROM "EthereumBlock" WHERE number = s.i)
      ORDER BY earliest_missing_block_number ASC
      LIMIT 1
    `);

    debug('earliestMissingBlockNumberResult', earliestMissingBlockNumberResult)

    const blocksAreMissing = !isEmpty(earliestMissingBlockNumberResult)
    const earliestMissingBlockNumber = get(earliestMissingBlockNumberResult, [0, 'earliest_missing_block_number'])

    debug('earliestMissingBlockNumber', earliestMissingBlockNumber)

    const start = blocksAreMissing ? Math.min(latestBlockNumber + 1, earliestMissingBlockNumber) : latestBlockNumber + 1
    debug('start block: ', start)

    const end = await web3.eth.getBlockNumber() || 0
    debug('end block: ', end)

    return {
      start,
      end,
    }

  } catch (e) {
    console.error(e)
  }
}
