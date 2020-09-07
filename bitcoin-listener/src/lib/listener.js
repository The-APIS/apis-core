const bitcoin = require('bitcoinjs-lib')
const zmq = require('zeromq')
const syncPastBlocks = require('@/lib/sync/syncPastBlocks')

const socket = zmq.socket('sub')


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
  console.log(`Listening to: tcp://${host}:${port}, ${network}`)
  socket.connect(`tcp://${host}:${port}`)
  socket.subscribe('rawtx')
  socket.subscribe('rawblock')
  socket.subscribe('hashblock')
  socket.on('message', async (topic, message) => {
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
  })
}
