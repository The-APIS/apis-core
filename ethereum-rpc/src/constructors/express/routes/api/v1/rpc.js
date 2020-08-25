// curl https://rpc.rinkeby.ethereum.dev.titans.finance \                                           [system]
// -X POST \
// -H "Content-Type: application/json" \
// -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'

const axios = require ('axios')
const router = require('express').Router()
const { ADDRESS_WHITELIST, RPC_COMMANDS } = require('@/constants')
// const ethereum = require('@/constructors/ethereum')


const makeRPCRequest = async (req, res) => {
  console.log('POST [rpc] makeRPCRequest')
  try {
      let response = null
      console.log('POST [rpc] makeRPCRequest')
      const { command, params } = req.body

      console.log(req.body)
      console.log('addr: ', `${process.env.ETHEREUM_HTTPS_ADDR}`)

      const { data, status } = await axios.post(process.env.ETHEREUM_HTTPS_ADDR, { ...req.body })

      return res.status(200).json(data)
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
