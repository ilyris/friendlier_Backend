const db = require("../../data/db"); 


const addUser = async ( newUser) => {
    return db('users')
    // Pass in the whole object into the insert statement.
    .insert(newUser);
}
const addUserProfile = async (newUserProfile) => {
    return db('profile_information')
    .insert(newUserProfile);
}
const findUsersBy = filter => db("users").where(filter);

const findProfileInformation = (filter) => {
    return db("profile_information").where(filter);
} ;
module.exports = {
    addUser,
    addUserProfile,
    findUsersBy,
    findProfileInformation,
}


