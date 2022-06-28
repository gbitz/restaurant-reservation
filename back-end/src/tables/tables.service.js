const knex = require("../db/connection")

function list() {
    return knex("tables")
    .select("*")
    .orderBy("table_name");
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((records) => records[0])
}

function update(update) {
    return knex("tables")
        .where({table_id: update.table_id})
        .update(update, "*")
        .then((records) => records[0])
}

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({table_id})
        .first()
}

module.exports = {
    list,
    create,
    update,
    read,
}