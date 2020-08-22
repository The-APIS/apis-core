const Client = require('bitcoin-core')
const client = new Client({
  host: process.env.BITCOIN_CORE_HOST || '127.0.0.1',
  network: process.env.BITCOIN_CORE_NETWORK || 'regtest',
  username: process.env.BITCOIN_CORE_USER || 'bitcoin_rpc_user',
  password: process.env.BITCOIN_CORE_PASS || 'bitcoin_rpc_pass',
  port: process.env.BITCOIN_CORE_RPC_PORT || '18333',
})

module.exports = client
