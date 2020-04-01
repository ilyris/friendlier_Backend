exports.up = knex =>
    knex.schema.createTable("Interest", tbl => {
        tbl.increments("id").primary()
        tbl.string("name", 128)
            .notNullable()
            .unique()
        tbl.timestamps(true, true)
    })

exports.down = knex => knex.schema.dropTableIfExists("Interest")
