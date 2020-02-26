
exports.up = knex =>
knex.schema.createTable("messages", tbl => {
  tbl.increments();
  tbl.integer("senderId").notNullable();
  tbl.integer('receiverId').notNullable();
  tbl.string("message").notNullable();
  tbl.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTableIfExists("messages");