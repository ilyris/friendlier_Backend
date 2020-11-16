exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("Interest")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("Interest").insert([
                { name: "fishing" },
                { name: "gamer" },
                { name: "hunting" },
                { name: "coding" },
                { name: "working out" },
                { name: "cats" },
                { name: "animals" },
                { name: "dogs" },
                { name: "sewing" },
                { name: "drawing" },
                { name: "animation" },
                { name: "education" },
                { name: "drinking" },
                { name: "board games" },
                { name: "cooking" }
            ])
        })
}
