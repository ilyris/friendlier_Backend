require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://postgres:${process.env.SEED_PW_TEST}@localhost:5432/postgres`,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds/dev'
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
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