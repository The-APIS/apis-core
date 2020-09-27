const axios = require('axios')
const { Op } = require("sequelize");
const router = require('express').Router()
const web3 = require('@/constructors/web3')
const get = require('lodash/get')

const web3GetTransactionsByAccount = require('@/bin/web3GetTransactionsByAccount')

const RPC_ADDR_MAP = {
  bitcoin: process.env.BITCOIN_HTTPS_ADDR,
  ethereum: process.env.ETHEREUM_HTTPS_ADDR,
}


module.exports = ({ models, ...context }) => {

  router.get('/addresses/:address/transactions', async (req, res, next) => {
    try {
      const { address = '*' } = req.params
      let {
        network = 'rinkeby',
        limit = 1000,
      } = { ...req.query }

      limit = Math.max(limit, 1000)

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

  // router.get('/web3/addresses/:address/transactions', async (req, res, next) => {
  //   try {
  //     const { address = '*' } = req.params
  //     const { startBlockNumber = 6500000, endBlockNumber = 7242250 } = req.query
  //     return res.status(200).json({ transactions: await web3GetTransactionsByAccount(address, startBlockNumber, endBlockNumber) })
  //   } catch (e) {
  //     console.error(e)
  //     return res.status(500).json({ errors: [e] })
  //   }
  // })


  router.get('/defi/rates', async (req, res, next) => {
    try {
      const { status, data } = await axios.get('https://api.rates.dev.titans.finance/api/v1/rates')
      return res.status(status).json({ rates: data })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })


  router.get('/addresses/:identifier/details', async (req, res, next) => {
    try {
      const { identifier } = req.params
      const {
        network = 'rinkeby',
        baseCurrency = 'USD',
      } = req.query

      const contract = await models.EthereumContract.findOne({
        where: {
          [Op.or]: [
            { slug: identifier },
            { address: identifier },
          ],
          [Op.and]: [{ network }],
        }
      })

      const cmcResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        params: {
          'start': '1',
          'limit': '5000',
          'convert': baseCurrency,
        },
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_APIKEY,
        },
      })

      const cmcData = get(cmcResponse, 'data.data').find(({ symbol }) => symbol === identifier)

      const cmcQuote = get(cmcData, ['quote', baseCurrency])

      return res.status(200).json({
        token: contract.slug,
        contractType: contract.type,
        contractAddress: contract.address,
        lastPrice: get(cmcQuote, 'price'), // From coinmarketcap
        marketcap: get(cmcQuote, 'market_cap'), // Market Cap
        volume: get(cmcQuote, 'volume_24h'), // Volume (24 h)
        circulatingSupply: get(cmcQuote, 'circulating_supply'), // Circulating Supply
        totalSupply: get(cmcQuote, 'total_supply'), // Total Supply
        metadata: {},
      })
    } catch (e) {
      console.error(`errors.api.v1.query`, e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
