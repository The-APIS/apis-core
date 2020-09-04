const cp = require('child_process')

module.exports = async () => {
  console.log('[Sequelize-Migrate] Running migrations...')
  try {
    await cp.spawnSync('./node_modules/.bin/sequelize', ['db:migrate'], {
      env: process.env,
      stdio: 'inherit',
    })
    console.log('[Sequelize-Migrate] Success.')
  } catch (error) {
    console.error(error)
  }
}
