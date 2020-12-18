const axios = require('axios')
const router = require('express').Router()

const { getRPCServiceAddress } = require('@/share/lib')


const bitcoin = module.exports = ({}) => {
  router.post('/', async (req, res) => {
    try {
      const { data, status } = await axios.post(`${
        getRPCServiceAddress({
          chain: 'bitcoin',
          network: req.query.network || 'testnet',
        })
      }/api/v1/rpc`, req.body)
      return res.status(status).json(data)
    } catch (error) {
      console.error(`errors.rpc.bitcoin`, error)
      return res.status(500).json(error)
    }
  })

  return router
}
