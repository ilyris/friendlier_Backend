
exports.up = knex =>
knex.schema.createTable("users", tbl => {
  tbl.increments('id').primary();
  tbl.string("email", 128).notNullable().unique();
  tbl.string("password", 128).notNullable();
  // tbl.text("token").notNullable();
  tbl.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTableIfExists("users");