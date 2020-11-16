exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("User")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("User").insert([
                { email: "test@aol.com", username: "test", password: "nothing" },
                { email: "test123@aol.com", username: "test123", password: "nothing123" },
                { email: "test234@aol.com", username: "test234", password: "nothing234" }
            ])
        })
}
