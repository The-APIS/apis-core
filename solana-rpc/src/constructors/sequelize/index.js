const Sequelize = require('sequelize')
const requireModels = require('./requireModels')

const host = process.env.POSTGRES_HOST || '127.0.0.1'
const port = process.env.POSTGRES_PORT || 5432
const database = process.env.POSTGRES_DATABASE || 'postgres'
const dialect = 'postgres'
const user = process.env.POSTGRES_USER || 'postgres'
const password = process.env.POSTGRES_PASSWORD || 'password'
const url = `postgresql://${user}:${password}@${host}:${port}/${database}`

const sequelize = new Sequelize(
  database,
  user,
  password,
  {
    host,
    dialect,
    logging: console.log,

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
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
