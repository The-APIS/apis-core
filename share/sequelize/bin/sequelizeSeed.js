const cp = require('child_process')

module.exports = async () => {
  console.log('[Sequelize-Seed] Running seeds...')
  try {
    await cp.spawnSync('./node_modules/.bin/sequelize', ['db:seed:all'], {
      env: process.env,
      stdio: 'inherit',
    })
    console.log('[Sequelize-Seed] Success.')
  } catch (error) {
    console.error(error)
  }
}

