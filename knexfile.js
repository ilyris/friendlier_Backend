require('dotenv').config();


module.exports = {
  development: {
    client: 'pg',
    connection: 'http://localhost:3000/',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds/dev'
    },
  },

  testing: {
    client: 'pg',
    connection: 'http://localhost:3000/',
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds/test' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: { directory: './data/seeds/products' },
}
};