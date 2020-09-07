const url = require('url');
const Client = require('bitcoin-core');


const bitcoinCoreUrl = url.parse(process.env.BITCOIN_RPC_ADDR)

const bitcoinCoreOptions = {
  network: 'testnet',
  host: bitcoinCoreUrl.host,
  version: '0.17.1',
  username: 'bitcoin_rpc_user',
  password: 'bitcoin_rpc_pass',
  port: process.env.BITCOIN_PORT,
}

if (bitcoinCoreUrl.protocol === 'https:') {
  bitcoinCoreOptions.ssl = {
    enabled: true,
    strict: false
  }
}

module.exports = new Client({ ...bitcoinCoreOptions });
