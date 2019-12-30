require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:Rammus652!@localhost:5432/postgres',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds/dev'
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: { directory: './data/seeds/products' },
}
};