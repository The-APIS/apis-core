module.exports.run = async () => {
  console.log('[gateway] Starting Express...')
  await require('@/constructors/express')({})
}
