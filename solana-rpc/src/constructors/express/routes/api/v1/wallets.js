const router = require('express').Router()
const get = require('lodash/get')
const bip39 = require('bip39')
const bip32 = require('bip32')
const bs58 = require('bs58')
const nacl = require('tweetnacl')
const web3 = require('@solana/web3.js')


const { Account } = web3

const RPC_ADDR_MAP = {
  bitcoin: process.env.BITCOIN_HTTPS_ADDR,
  ethereum: process.env.ETHEREUM_HTTPS_ADDR,
  solana: process.env.SOLANA_HTTPS_ADDR,
}


async function generateMnemonicAndSeed() {
  const mnemonic = bip39.generateMnemonic(128)
  const seed = await bip39.mnemonicToSeed(mnemonic)
  return { mnemonic, seed: Buffer.from(seed) }
}

const getAccountFromSeed = (seed, walletIndex = 0, accountIndex = 0) => {
  const derivedSeed = bip32
    .fromSeed(seed)
    // .derivePath(`m/0/0`).privateKey;
    .derivePath(`m/501'/${walletIndex}'/0/${accountIndex}`).privateKey;
  return new Account(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
}

const createAccount = async (wi = 0, ai = 0) => {
  const seed = (await generateMnemonicAndSeed()).seed
  return getAccountFromSeed(seed, wi, ai)
}

const keysFromAccount = (account) => {
  return {
    publicKey: account.publicKey.toString(),
    secretKey: bs58.encode(account.secretKey),
  }
}


module.exports = (context) => {
  router.post('/', async (req, res, next) => {
    try {
      const { network, options = {} } = req.body

      console.log('Creating Solana account...')
      const account = await createAccount()
      const keys = keysFromAccount(account)

      return res.status(200).json({
        data: {
          address: keys.publicKey,
          privateKey: keys.secretKey,
        },
      })
    } catch (e) {
      console.error(`errors.api.v1.wallets`, e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
