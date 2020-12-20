const Web3 = require('web3')

let web3
let reconnectTimeout

const Web3Provider = ({ address }) => {
  const { HttpProvider } = Web3.providers
  console.log(`[Web3][Websocket] Initializing connection... ${address}`)
  return new Web3(new HttpProvider(address))
}


module.exports = Web3Provider({ address: process.env.ETHEREUM_HTTPS_ADDR || 'http://127.0.0.1:8546' })
