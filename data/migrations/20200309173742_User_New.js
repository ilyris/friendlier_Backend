exports.up = (knex) =>
    knex.schema.createTable("User", (tbl) => {
        tbl.increments("id").primary()
        tbl.string("username", 128).notNullable().unique()
        tbl.string("email", 128).notNullable().unique()
        tbl.string("password", 128).notNullable()
        tbl.timestamps(true, true)
    })

exports.down = (knex) => knex.schema.dropTableIfExists("User")
