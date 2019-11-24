const db = require("../../data/db"); 


const addUser = async ( newUser) => {
    return db('users')
    // Pass in the whole object into the insert statement.
    .insert(newUser);
}

const findUsersBy = filter => db("users").where(filter);
module.exports = {
    addUser,
    findUsersBy,
}


