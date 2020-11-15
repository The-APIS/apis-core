const { exec } = require("child_process");
const router = require('express').Router()
const get = require('lodash/get')


/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) console.warn(error);
      resolve(stdout? stdout : stderr);
    });
  });
}


module.exports = (context) => {
  router.post('/', async (req, res, next) => {
    try {
      const {
        address = '',
        network = 'mainnet',
        options = {},
      } = req.body

      console.log('Creating Solana token...')

      console.log('network', network)

      let networkAddress = 'https://api.mainnet-beta.solana.com'
      if (network === 'devnet') networkAddress = 'https://devnet.solana.com'
      if (network === 'testnet') networkAddress = 'https://testnet.solana.com'
      if (network === 'mainnet') networkAddress = 'https://api.mainnet-beta.solana.com'

      // Set network
      await execShellCommand(`solana config set --url ${networkAddress}`)


      // Create token
      const out = await execShellCommand(`spl-token create-token`)
      const parsed = out.split('\n').join(' ').split(' ')

      const token = parsed[2]
      const signature = parsed[4]

      return res.status(200).json({
        data: {
          token,
          signature,
        },
      })
    } catch (e) {
      console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
