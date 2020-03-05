exports.up = knex =>
    knex.schema.createTable("messages", tbl => {
        tbl.increments("id").primary()
        tbl.integer("senderId")
            .notNullable()
            .references("id")
            .inTable("users")
        tbl.integer("receiverId")
            .notNullable()
            .references("id")
            .inTable("users")
        tbl.string("message").notNullable()
        tbl.bigInteger("sentAt").notNullable()
        tbl.timestamps(true, true)
    })

exports.down = knex => knex.schema.dropTableIfExists("messages")
