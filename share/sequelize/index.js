const Sequelize = require('sequelize')
const requireModels = require('./requireModels')

const host = process.env.POSTGRES_HOST || '127.0.0.1'
const port = process.env.POSTGRES_PORT || 5432
const database = process.env.POSTGRES_DATABASE || 'postgres'
const dialect = 'postgres'
const user = process.env.POSTGRES_USER || 'postgres'
const password = process.env.POSTGRES_PASSWORD || 'password'
const poolMax = parseInt(process.env.SEQUELIZE_WORKER_POOL_MAX || 10)
const poolMin = parseInt(process.env.SEQUELIZE_WORKER_POOL_MIN || 0)
const poolAcquire = parseInt(process.env.SEQUELIZE_WORKER_POOL_ACQUIRE || 30000)
const poolIdle = parseInt(process.env.SEQUELIZE_WORKER_POOL_IDLE || 10000)

// `postgresql://${user}:${password}@${host}:${port}/${database}`

const sequelize = new Sequelize(
  database,
  user,
  password,
  {
    host,
    dialect,
    logging: console.log,

    pool: {
      max: poolMax,
      min: poolMin,
      acquire: poolAcquire,
      idle: poolIdle,
    },

    operatorsAliases: Sequelize.Op,

    define: {
      freezeTableName: true,
    },
  }
)

module.exports = ({ modelsPath }) => ({
  sequelize,
  Sequelize,
  models: requireModels({ sequelize, Sequelize, modelsPath }),
})
