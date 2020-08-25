const ADDRESS_WHITELIST = require('@/constants/addressWhitelist')
const RPC_COMMANDS = require('@/constants/rpcCommands')

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24

module.exports = {
  ADDRESS_WHITELIST,
  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
  ONE_DAY,
  RPC_COMMANDS,
}
