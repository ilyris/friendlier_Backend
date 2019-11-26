
exports.up = knex =>
knex.schema.createTable("profile_interests", tbl => {
  tbl.increments();
  tbl.specificType('interests', 'text ARRAY').notNullable();
  // tbl.text("token").notNullable();
  tbl.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTableIfExists("profile_interests");