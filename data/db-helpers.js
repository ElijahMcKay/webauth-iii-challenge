const db = require('./db-config'); 

module.exports = {
    getUsers,
    // getUserByUsername,
    addUser,
    findBy
}

function getUsers() {
    return db('users'); 
}

// function getUserByUsername(username) {
//     return db('users').where({ username: username }).first(); 
// }

// function findBy(where) {
//     return db('users').where(where); 
// }

function findBy(username) {
    return db('users').where({ username }).first()
}

function addUser(user) {
    return db('users').insert(user); 
}