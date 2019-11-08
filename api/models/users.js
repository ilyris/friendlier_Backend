const db = require("../../data/db"); 


const addUser = async ( newUser) => {
    return db('users')
    // Pass in the whole object into the insert statement.
    .insert(newUser);
}

module.exports = {
    addUser,
    // hashPassword
}


