const axios = require('axios')
const router = require('express').Router()

const { getRPCServiceAddress } = require('@/share/lib')


const bsc = module.exports = ({}) => {
  router.post('/', async (req, res) => {
    try {
      const { data, status } = await axios.post(`${
        getRPCServiceAddress({
          chain: 'binance_smart_chain',
          network: req.query.network || 'testnet',
        })
      }/api/v1/rpc`, req.body)
      return res.status(status).json(data)
    } catch (error) {
      console.error(`errors.rpc.bsc`, error)
      return res.status(500).json(error)
    }
  })

  return router
}
