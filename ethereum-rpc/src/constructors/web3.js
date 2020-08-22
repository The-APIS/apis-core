const Web3 = require('web3')

let web3
let reconnectTimeout

const reconnect = () => {
  clearTimeout(reconnectTimeout)
  reconnectTimeout = setTimeout(() => {
    const socketAddress = process.env.ETHEREUM_WSS_ADDR
    console.log(`[Web3][Websocket] Re-connecting: ${socketAddress}...`)
    web3 = Web3Provider({ socketAddress })
  }, 5000)
}

const Web3Provider = ({ socketAddress }) => {
  const { WebsocketProvider, HttpProvider } = Web3.providers
  console.log(`[Web3][Websocket] Initializing connection... ${socketAddress}`)
  let provider = new WebsocketProvider(socketAddress)
  provider.on('connect', () => console.log(`[Web3][Websocket] connected: ${socketAddress}.`))
  provider.on('end', e => {
    console.warn(`[Web3][Websocket] Connection ended: ${socketAddress}.`)
    reconnect()
  })
  provider.on('error', e => {
    console.error(`[Web3][Websocket] Error: ${socketAddress}.`, e)
    console.log('[Web3][Websocket] This is due to connectivity issues with the Geth node.')
    console.log('[Web3][Websocket] Are the URL and port for your Geth node correct?')
    reconnect()
  })
  return new Web3(provider)
}


module.exports = Web3Provider({ socketAddress: process.env.ETHEREUM_WSS_ADDR || 'http://127.0.0.1:8545' })
