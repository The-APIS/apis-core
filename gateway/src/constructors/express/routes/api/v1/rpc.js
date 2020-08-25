const axios = require('axios')
const router = require('express').Router()

// BITCOIN_RPC_ADDR=bitcoin-rpc
// ETHEREUM_RPC_ADDR=ethereum-rpc


const commands = module.exports = ({}) => {

  router.post('/', async (req, res) => {
    try {
      let response = null
      console.log('POST [commands] makeRPCRequest')
      const { command, params } = req.body

      console.log(req.body)
      console.log('addr: ', `http://${process.env.ETHEREUM_RPC_ADDR}/api/v1/rpc`)

      // TODO proxy to proper service
      const { data, status } = await axios.post(`http://${process.env.ETHEREUM_RPC_ADDR}/api/v1/rpc`, { ...req.body })
      // console.log('result:', result)

      return res.status(200).json(data)
    } catch (error) {
      console.error(`errors.commands`, error)
      return res.status(500).json(error)
    }
  })

  return router
}
