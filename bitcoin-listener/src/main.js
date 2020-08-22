const bitcoin = require('bitcoinjs-lib')
const zmq = require('zeromq')

const socket = zmq.socket('sub')


module.exports.run = async (
  host = process.env.BITCOIN_CORE_HOST,
  port = process.env.BITCOIN_CORE_ZMQ_PORT,
  network = process.env.BITCOIN_CORE_NETWORK,
) => {
  /*
   * Events include:
   * - rawtx
   * - rawblock
   * - hashtx
   * - hashblock
  **/
  socket.connect(`tcp://${host}:${port}`)
  socket.subscribe('rawtx')
  socket.subscribe('rawblock')
  socket.on('message', async (topic, message) => {
    console.log(topic.toString(), 'message received')
    try {
      switch(topic.toString()) {
        case 'rawblock':
          const block = bitcoin.Block.fromBuffer(message)
          const { transactions } = block
          for (let i = 1; i < transactions.length; i++) { // skip coinbase
            const tx = transactions[i]
            const { outs } = tx
            for (let j = 0; j < outs.length; j++) {
              const out = outs[j]

              try {
                // handle bitcoin transaction
                console.log('bitcoin values: ')
                console.log('toAddress: ', bitcoin.address.fromOutputScript(out.script, bitcoin.networks[network]))
                console.log('blockHash: ', block.getHash().reverse().toString('hex'))
                console.log('txHash: ', tx.getHash().reverse().toString('hex'))
                console.log('out.value: ', out.value)
              } catch(e) {
                // handle bitcoin errors
                console.error(e)
              }
            }
          }
          break
        default: // no-op
      }
    } catch (e) {
      console.error(e)
    }
  })
}
