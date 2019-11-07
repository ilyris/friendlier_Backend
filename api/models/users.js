const db = require("../../data/db"); 
const { hash } = require('bcrypt'); // bcrypt will encrypt passwords to be saved in db


const addUser = async ( newUser) => {
    const password = await hash(newUser.password, 10); 
    newUser.password = password;
    return db('users')
    // Pass in the whole object into the insert statement.
    .insert(newUser);
}

module.exports = {
    addUser,
    // hashPassword
}


