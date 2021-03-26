const url = require('url');
const Client = require('bitcoin-core');


const bitcoinCoreUrl = url.parse(process.env.BITCOIN_HTTPS_ADDR)

const bitcoinCoreOptions = {
  network: process.env.BITCOIN_CORE_NETWORK,
  host: bitcoinCoreUrl.host,
  version: process.env.BITCOIN_CORE_VERSION,
  username: process.env.BITCOIN_CORE_USER,
  password: process.env.BITCOIN_CORE_PASS,
  port: process.env.BITCOIN_PORT,
}

if (bitcoinCoreUrl.protocol === 'https:') {
  bitcoinCoreOptions.ssl = {
    enabled: true,
    strict: false
  }
}

module.exports = new Client({ ...bitcoinCoreOptions });
