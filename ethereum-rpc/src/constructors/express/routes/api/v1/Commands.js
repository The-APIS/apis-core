const router = require('express').Router()
const { ADDRESS_WHITELIST, RPC_COMMANDS } = require('@/constants')
const ethereum = require('@/constructors/ethereum')


const makeRPCRequest = async (req, res) => {
  console.log('POST [commands] makeRPCRequest')
  try {
    let response = null
    let contract
    let decimals
    let balance

    const { command, params } = req.body

    console.log(req.body)

    if (!Object.keys(RPC_COMMANDS).includes(command)) {
      return res.status(404).json(new Error('errors.commands.unrecognized-command'))
    }

    // TODO - SUBMIT COMMAND to node

    // switch (command) {
    //   case 'getBalance':
    //     balance = await ethereum.web3.eth.getBalance(params.address)
    //     response = ethereum.web3.utils.fromWei(balance.toString())
    //     break
    //   default:
    // }

    return res.status(200).json(response)
  } catch (error) {
    console.error(`errors.commands`, error)
    return res.status(500).json(error)
  }
}

const commands = module.exports = ({}) => {
  router.post('/', makeRPCRequest)
  return router
}

commands.makeRPCRequest = makeRPCRequest
