const axios = require ('axios')
const router = require('express').Router()
// const solanaWeb3 = require('@solana/web3.js');


const makeRPCRequest = async (req, res) => {
  try {
      const { network = 'mainnet' } = req.query
      let networkAddress
      if (network === 'devnet') networkAddress = 'https://devnet.solana.com'
      if (network === 'testnet') networkAddress = 'https://testnet.solana.com'
      if (network === 'mainnet') networkAddress = 'https://api.mainnet-beta.solana.com'
      // process.env.SOLANA_HTTPS_ADDR
    console.log('network', network, 'networkAddress', networkAddress)
      const { data, status } = await axios.post(networkAddress, { ...req.body }, { ...req.headers })
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
