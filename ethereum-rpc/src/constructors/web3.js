const Web3 = require('web3')
const Web3WsProvider = require('web3-providers-ws');

const options = {
  timeout: 30000, // ms

  // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
  // headers: {
  //   authorization: `Basic ${process.env.ETHEREUM_WSS_USER}:${process.env.ETHEREUM_WSS_PASS}`
  // },

  // Useful if requests result are large
  clientConfig: {
    maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
    maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
  },

  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 5,
    onTimeout: false
  },
};

module.exports = new Web3(process.env.CHAIN_NETWORK_HTTPS_ADDR || 'http://127.0.0.1:8546', options)