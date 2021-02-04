const axios = require('axios')
const { Op } = require("sequelize");
const router = require('express').Router()
const get = require('lodash/get')


module.exports = ({ models, ...context }) => {

  router.get('/:address/transactions', async (req, res, next) => {
    try {
      const { address = '*' } = req.params
      let {
        network = (process.env.BINANCE_SMART_CHAIN_NETWORK || 'rinkeby'),
        limit = 1000,
      } = { ...req.query }

      limit = Math.min(limit, 1000)

      const txns = await models.EthereumTx.findAll({
        where: {
          [Op.or]: [
            { from: address },
            { to: address },
          ],
        },
        raw: true,
      })

      console.log('txns', txns)

      return res.status(200).json({ transactions: txns })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
