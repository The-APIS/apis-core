module.exports.run = async () => {
  console.log('[gateway] Starting Express...')
  // const [
  //   postgres,
  // ] = await Promise.all([
  //   await require(`@/constructors/postgres`)(),
  // ])

  const {
    sequelize,
    Sequelize,
    models,
  } = require('@/constructors/sequelize')({})

  const expressContext = {
    // postgres,
    sequelize,
    Sequelize,
    models,
    session: true,
  }

  console.log('[Gateway][Main] Starting Express Server...')
  await require('@/constructors/express')({})

  if (process.env.MIGRATE_ON_BOOTSTRAP === 'true') await require('./bin/sequelizeMigrate')()
}
