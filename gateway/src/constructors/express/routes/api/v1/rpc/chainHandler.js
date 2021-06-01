
const axios = require('axios')
const router = require('express').Router()

const { getRPCServiceAddress } = require('@/share/lib')


/**
 * @title chainHandler 
 * @dev   Handles the ethreum,bitcoin and bsc rpc endpoints
 * @dev   chainValue : identifies the chain 
 * @dev   networkValue: identifies the network type
 */

const chainHandler = module.exports = ({ }) => {

  router.post('/', async (req, res) => {


    const baseUrl = req.baseUrl
    const urlValue = baseUrl.split('/')[4]


    try {
      let chainValue, networkValue

      if (urlValue === 'ethereum') {
        chainValue = 'ethereum'
        networkValue = 'rinkeby'
      }
      else if (urlValue === 'bitcoin') {
        chainValue = 'bitcoin'
        networkValue = 'testnet'
      }
      else if (urlValue === 'binance-smart-chain' || 'bsc') {
        chainValue = 'binance_smart_chain'
        networkValue = 'testnet'
      }

      const { data, status } = await axios.post(`${getRPCServiceAddress({
        chain: chainValue,
        network: req.query.network || networkValue,
      })
        }/api/v1/rpc`, req.body)
      return res.status(status).json(data)

    } catch (error) {
      console.error(`errors.rpc.${urlValue}`, error)
      return res.status(500).json(error)
    }
  })

  return router
}

