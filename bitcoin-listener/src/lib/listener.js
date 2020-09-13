const bitcoin = require('bitcoinjs-lib')
const zmq = require('zeromq')

const syncPastBlocks = require('@/lib/sync/syncPastBlocks')

// https://bitcoindev.network/accessing-bitcoins-zeromq-interface/


module.exports = async ({
  host,
  port,
  network,
  sequelize,
  Sequelize,
  models,
  ...rest
}) => {
  /*
   * Events include:
   * - rawtx
   * - rawblock
   * - hashtx
   * - hashblock
  **/
  const socket = new zmq.Subscriber

  console.log(`Listening to: tcp://${host}:${port}, ${network}`)

  socket.connect(`tcp://${host}:${port}`)

  socket.subscribe('rawtx')
  socket.subscribe('rawblock')
  socket.subscribe('hashblock')

  for await (const [topic, msg] of socket) {
    console.log("received a message related to:", topic.toString(), "containing message:", msg)
    try {
      switch(topic.toString()) {
        case 'rawblock':
          await syncPastBlocks({
            host,
            port,
            network,
            sequelize,
            Sequelize,
            models,
            ...rest
          })
          break
        default: // no-op
      }
    } catch (e) {
      console.error(e)
    }
  }
}
