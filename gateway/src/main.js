module.exports.run = async () => {
  console.log('[gateway] Starting Express...')
  const [
    postgres,
  ] = await Promise.all([
    await require(`@/share/constructors/postgres`)(),
  ])

  const {
    sequelize,
    Sequelize,
    models,
  } = require('@/share/sequelize')({})

  const expressContext = {
    postgres,
    sequelize,
    Sequelize,
    models,
    session: true,
  }

  if (process.env.MIGRATE_ON_BOOTSTRAP === 'true') await require('@/share/sequelize/bin/sequelizeMigrate')()

  console.log('[Gateway][Main] Starting Express Server...')
  await require('@/constructors/express')({})

}
