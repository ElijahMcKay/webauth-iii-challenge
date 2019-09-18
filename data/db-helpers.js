const db = require('./db-config'); 

module.exports = {
    addUser,
}


function addUser(user) {
    return db('users').insert(user); 
}