exports.up = (knex) =>
    knex.schema.createTable("Message_New", (tbl) => {
        tbl.increments()
        tbl.integer("sender_id").notNullable().references("id").inTable("User")
        tbl.integer("receiver_id").notNullable().references("id").inTable("User")
        tbl.text("content")
        tbl.enu("status", ["is_read", "sent", "failed"])
        tbl.timestamps(true, true)
    })

exports.down = (knex) => knex.schema.dropTableIfExists("Message_New")
