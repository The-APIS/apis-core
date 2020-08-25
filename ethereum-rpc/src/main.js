module.exports.run = async () => {
  console.log('[ethereum-rpc] Starting Express...')
  await require('@/constructors/express')({})
}
