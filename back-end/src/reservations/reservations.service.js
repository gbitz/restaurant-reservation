const knex = require("../db/connection")

function list(reservation_date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time")
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((records) => records[0]);
}

module.exports = {
    list,
    create

}