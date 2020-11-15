const axios = require('axios')
const router = require('express').Router()


module.exports = ({ models, ...context }) => {

  router.get('/', async (req, res, next) => {
    try {
      let {
        limit = 100,
        // offset = 0,
        address = "",
        slug = "",
        ...query
      } = req.query

      // TODO - naive mainnet token slug match
      if (slug.toUpperCase() === 'USDC') {
        address = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
      }

      console.log('slug', slug)
      console.log('address', address)

      const { data, status } = await axios.post(
        process.env.SOLANA_HTTPS_ADDR, {
          method: "getConfirmedSignaturesForAddress2",
          jsonrpc: "2.0",
          params: [
            address,
            {
              limit: parseInt(limit),
              // offset: parseInt(offset),
            },
          ],
          id: "325e3b61-ee64-4470-8c34-adf974d82bc4",
        }, { ...req.headers })
      return res.status(status).json(data)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
