module.exports.run = async () => {
  console.log('[gateway] Starting Express...')
  const [
    postgres,
    // redis,
    // { io },
  ] = await Promise.all([
    await require(`@/constructors/postgres`)(),
    // await require(`@/singletons/redis`),
    // await require(`@/singletons/io`),
  ])
  // const sockets = await require(`./constructors/sockets`)({ io })




  const {
    sequelize,
    Sequelize,
    models,
  } = require('@/constructors/sequelize')({})

  const expressContext = {
    postgres,
    // redis,
    // io,
    sequelize,
    Sequelize,
    models,
    session: true,
  }

  console.log('[Gateway][Main] Starting Express Server...')
  await require('@/constructors/express')({})

  if (process.env.MIGRATE_ON_BOOTSTRAP === 'true') await require('./bin/sequelizeMigrate')()
}
