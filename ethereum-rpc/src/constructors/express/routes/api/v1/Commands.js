const router = require('express').Router()
const { ADDRESS_WHITELIST } = require('@/constants')
const ethereum = require('@/constructors/ethereum')


const makeRPCRequest = async (req, res) => {
  console.log('POST [Commands] makeRPCRequest')
  try {
    let response = null
    let contract
    let decimals
    let balance

    const { command, params } = req.body

    console.log(req.body)

    switch (command) {
      case 'getBalance':
        balance = await ethereum.web3.eth.getBalance(params.address)
        response = ethereum.web3.utils.fromWei(balance.toString())
        break
      default:
        throw new Error('errors.Commands.unrecognized-command')
    }

    return res.status(200).json(response)
  } catch (error) {
    console.error(`errors.Commands`, error)
    return res.status(500).json(error)
  }
}

const Commands = module.exports = ({}) => {
  router.post('/', makeRPCRequest)
  return router
}

Commands.makeRPCRequest = makeRPCRequest
