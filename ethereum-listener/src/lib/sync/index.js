module.exports = async (context) => {
  require('./syncPastBlocks')(context)
  require('./syncCurrentBlocks')(context)
}
