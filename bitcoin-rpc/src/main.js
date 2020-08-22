module.exports.run = async () => {
  console.log('[bitcoin-rpc] Starting Express...')
  await require('@/constructors/express')({})
}
