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

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({reservation_id})
        .first()
}

// async function statusTransaction(reservation, table) {
//     const tableUpdate = table;
//     const reservationUpdate = reservation;
//     try {
//         await knex.transaction(async trx => {
//             const reservation = await trx("reservations").where({reservation_id : reservationUpdate.reservation_id}).update(reservationUpdate,"*").then((records) => records[0])
//             const table = await trx("tables").where({reservation_id : tableUpdate.reservation_id}).update(tableUpdate).then((records) => records[0])
            
//             console.log(reservation)
//             console.log(table)
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

function update(update) {
    return knex("reservations")
        .where({reservation_id: update.reservation_id})
        .update(update, "*")
        .then((records) => records[0])
}



module.exports = {
    list,
    create,
    read,
    update,

}