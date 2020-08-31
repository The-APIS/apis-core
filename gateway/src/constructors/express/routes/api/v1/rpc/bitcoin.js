const axios = require('axios')
const router = require('express').Router()

const bitcoin = module.exports = ({}) => {

  router.post('/', async (req, res) => {
    try {
      const { data, status } = await axios.post(`${process.env.BITCOIN_RPC_ADDR}/api/v1/rpc`, req.body)
      return res.status(status).json(data)
    } catch (error) {
      console.error(`errors.rpc.bitcoin`, error)
      return res.status(500).json(error)
    }
  })

  return router
}
