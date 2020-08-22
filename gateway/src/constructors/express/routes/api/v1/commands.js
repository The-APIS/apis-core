const router = require('express').Router()


const commands = module.exports = ({}) => {

  router.post('/', async (req, res) => {
    try {
      let response = null
      console.log('POST [commands] makeRPCRequest')
      const { command, params } = req.body

      console.log(req.body)

      switch (command) {
        case 'sendToAddress':
          break
        case 'getBalance':
          break
        case 'createWallet':
          break
        default:
          throw new Error('errors.commands.unrecognized-command')
      }
      return res.status(200).json(response)
    } catch (error) {
      console.error(`errors.commands`, error)
      return res.status(500).json(error)
    }
  })

  return router
}
