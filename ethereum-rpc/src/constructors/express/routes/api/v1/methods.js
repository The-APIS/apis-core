const axios = require('axios')
const router = require('express').Router()


const ethereum = require('@/constructors/ethereum')
const { queryStringIncludeToModelsInclude } = require('@/share/lib')


const checksumAddresses = (query) => ({
  ...query,
  ...['address', 'contract', 'to', 'from'].reduce((acc, field) => !query[field] ? acc : {
    ...acc,
    [field]: ethereum.web3.utils.toChecksumAddress(query[field]),
  }, {}),
})

module.exports = ({ models, sequelize, ...context }) => {

  router.get('/', async (req, res, next) => {
    try {
      let {
        limit = 100,
        offset = 0,
        include,
        startBlock = 0,
        endBlock,
        excludeConfirmationCount = 0,
        chain,
        network,
        ...query
      } = { ...req.query }

      const where = {
        ...checksumAddresses(query),
      }

      if (startBlock) {
        query.where.EthereumTx.blockNumber = {
          [sequelize.Op.gt]: startBlock,
        }
        if (endBlock) {
          query.where.EthereumTx.blockNumber[sequelize.Op.lt] = (excludeConfirmationCount ? endBlock - excludeConfirmationCount : endBlock)
        }
      }

      const methods = await models.EthereumMethod.findAll({
        where,
        limit: Math.min(limit, 1000),
        offset,
        include: queryStringIncludeToModelsInclude({ models, include }),
      })

      return res.status(200).json({
        data: methods,
      })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
