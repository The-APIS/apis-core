const axios = require ('axios')
const router = require('express').Router()


const makeRPCRequest = async (req, res) => {
  try {
      const { data, status } = await axios.post(process.env.BINANCE_SMART_CHAIN_HTTPS_ADDR, { ...req.body }, { ...req.headers })
      return res.status(status).json(data)
    } catch (error) {
      console.error(`errors.rpc`, error)
      return res.status(500).json(error)
    }
}

const rpc = module.exports = ({}) => {
  router.post('/', makeRPCRequest)
  return router
}

rpc.makeRPCRequest = makeRPCRequest
