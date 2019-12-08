
exports.up = knex =>
knex.schema.createTable("profile_interests", tbl => {
  tbl.increments();
  tbl.specificType('interests', 'text ARRAY').notNullable();
});

exports.down = knex => knex.schema.dropTableIfExists("profile_interests");