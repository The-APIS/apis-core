const axios = require ('axios')
const router = require('express').Router()
const { ADDRESS_WHITELIST, RPC_COMMANDS } = require('@/constants')

const makeRPCRequest = async (req, res) => {
  console.log('POST [rpc] makeRPCRequest')

  try {
      const { data, status } = await axios({
        method: 'POST',
        url: process.env.BITCOIN_HTTPS_ADDR,
        data: req.body,
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.BITCOIN_CORE_USER}:${process.env.BITCOIN_CORE_PASS}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      })
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
