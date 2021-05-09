const fs = require('fs')

module.exports = {
  development: {
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
}
