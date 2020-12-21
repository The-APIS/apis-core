const axios = require('axios')
const router = require('express').Router()


module.exports = ({ models, ethereum: { web3, buildContract, compiler }, ...context }) => {

  router.post('/', async (req, res, next) => {
    try {
      const {
        network = 'mainnet',
        type = 'UNISWAP',
        amount = 0,
        sender = '',
        recipient = '',
        tokenContractAddress = '',
        privateKey = '',
        sendOptions = {
          gasLimit: web3.utils.toHex(100000),
          gasPrice: web3.utils.toHex(50e9),
        },
        token = {},
        ...body
      } = req.body

      const result = await compiler.deployContract({
        token,
        type,
        sender,
        privateKey,
        sendOptions,
      })

      console.log('result', result)

      return res.status(200).json(result.deployTransaction)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
