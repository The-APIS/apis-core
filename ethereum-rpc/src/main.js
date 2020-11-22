const ethereum = require('@/constructors/ethereum')

module.exports.run = async () => {
  console.log('[gateway] Starting Express...')
  const [
    postgres,
  ] = await Promise.all([
    await require(`@/constructors/postgres`)(),
  ])

  const {
    sequelize,
    Sequelize,
    models,
  } = require('@/constructors/sequelize')({})

  const context = {
    postgres,
    sequelize,
    Sequelize,
    models,
    session: true,
    ethereum,
  }

  console.log('[ethereum-rpc] Starting Express...')
  await require('@/constructors/express')(context)

}
