exports.up = knex =>
    knex.schema.createTable("Location", tbl => {
        tbl.increments()
        tbl.string("country", 128).notNullable()
        tbl.string("state", 128).notNullable()
        tbl.string("city", 128).notNullable()
        tbl.string("zipcode", 128).notNullable()
        tbl.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
        tbl.timestamps(true, true)
    })

exports.down = knex => knex.schema.dropTableIfExists("Location")
