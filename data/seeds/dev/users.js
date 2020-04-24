exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("users")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("users").insert([
                { email: "test", password: "nothing" },
                { email: "test123", password: "nothing123" },
                { email: "test234", password: "nothing234" }
            ])
        })
}
