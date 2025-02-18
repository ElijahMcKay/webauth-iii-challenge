const knex = require('knex'); 

exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.string('username')
            .notNullable()
        tbl.string('password')
            .notNullable()
        tbl.string('department')
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
