
exports.up = knex =>
knex.schema.createTable("profile_information", tbl => {
  tbl.increments();
  tbl.string("email", 128).notNullable().unique();
  tbl.specificType('interests', 'text ARRAY').notNullable();
  tbl.string("firstName", 128).notNullable();
  tbl.string("lastName", 128).notNullable();
  tbl.string("tagLine", 128).notNullable();
  tbl.string("education", 128).notNullable();
  tbl.string("region", 128).notNullable();
  tbl.string("city", 128).notNullable();
  tbl.string("state", 128).notNullable();
  // tbl.text("token").notNullable();
  tbl.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTableIfExists("profile_information");