exports.up = (knex) =>
    knex.schema.createTable("Profile", (tbl) => {
        tbl.increments()
        tbl.string("education", 128).notNullable()
        tbl.integer("user_id").notNullable().references("id").inTable("User")
        tbl.string("tagline", 128)
        tbl.timestamps(true, true)
    })

exports.down = (knex) => knex.schema.dropTableIfExists("Profile")
