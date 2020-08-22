const router = require('express').Router()
const bitcoinCoreClient = require('@/constructors/bitcoin-core')
const { ADDRESS_WHITELIST } = require('@/constants')


const makeRPCRequest = async (req, res) => {
  try {
    let response = null
    console.log('POST [commands] makeRPCRequest')
    const {
      command,
      params,
    } = req.body
    console.log(req.body)
    switch (command) {
      case 'send_to_address':
        if (!ADDRESS_WHITELIST.BTC.includes(params.address)) {
          throw new Error('errors.Commands.unsafe-address')
        }
        response = await bitcoinCoreClient.sendToAddress(params.address, params.amount)
        break
      case 'listunspent':
        const unspent = await bitcoinCoreClient.listUnspent()
        if (params.address) {
          response = unspent.find(item => (item.address === params.address))
        } else {
          response = unspent
        }
        break
      case 'listaddressgroupings':
        response = await bitcoinCoreClient.listAddressGroupings()
        break
      default:
        throw new Error('errors.commands.unrecognized-command')
    }
    return res.status(200).json(response)
  } catch (error) {
    console.error(`errors.commands`, error)
    return res.status(500).json(error)
  }
}

const Commands = module.exports = ({}) => {
  router.post('/', makeRPCRequest)
  return router
}

Commands.makeRPCRequest = makeRPCRequest
