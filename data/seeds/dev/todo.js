exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("todo")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("todo").insert([
                { id: 4, task: "sdfg" },
                { id: 5, task: "sdfgsfdg" },
                { id: 6, task: "zxcvzxcv" }
            ])
        })
}
