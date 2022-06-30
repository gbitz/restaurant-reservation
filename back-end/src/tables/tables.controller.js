const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationService = require("../reservations/reservations.service")

// Validation for correct reservation values
function bodyDataHas(propertyName) {
    return function (req,res,next) {
        const {data = {} } = req.body;
        if (data[propertyName]) {
            return next();
        }
        next({status : 400, message: `Must include a ${propertyName}` });
    }
}

function checkValidCapacity(req, res, next) {
    const {capacity} = req.body.data;
    const testNumber = Number(capacity)
    if(testNumber >= 1 && typeof(capacity) === "number") {
        return next();
    }
    next({status:400, message:`capacity must be at least 1`})
}

function checkValidTableName(req, res,next) {
    const {table_name} = req.body.data;
    if (table_name.length >= 2) {
        return next()
    } 
    next({status:400, message:`table_name must be at least 2 characters long`})

}

/**
 * Lists all tables 
 */
async function list(req, res){
    const data = await service.list();
    res.json({data})
}

/** 
 * Create hander for table resources
*/
async function create(req,res,next) {
    const table = await service.create(req.body.data);
    res.status(201).json({data: table})
}

/**
 * update table when seated
 */
async function update(req,res,next) {
    const {table, reservation} = res.locals;
    const update = {
        ...table,
        reservation_id: reservation.reservation_id
    }
    const updatedTable = await service.update(update)
    res.status(200).json({data : updatedTable})
}
/**
 * Check if table exists in DB
 */
async function checkTableExists(req, res, next) {
    const {table_id} = req.params
    const table = await service.read(table_id)
    if (table) {
        res.locals.table = table;
        return next()
    } 
    next({status:404, message:`Table ${table_id} does not exist`})
}

async function checkReservationExists(req,res,next) {
    const {reservation_id} =  req.body.data;
    const reservation = await reservationService.read(Number(reservation_id));
    if (reservation) {
        res.locals.reservation = reservation;
        return next();
    }
    next({status:404, message:`${reservation_id} does not exist`})
}

async function checkTableSize(req,res,next) {
    const {table, reservation} = res.locals;
    if(table.capacity >= reservation.people) {
        return next();
    }
    next({status:400, message:"insufficient table capacity"})
} 

async function checkIfOccupied(req,res,next) {
    const {table} = res.locals;
    if (!table.reservation_id) {
        return next();
    }
    next({status:400, message:"table is occupied"})
}


module.exports ={
    list: asyncErrorBoundary(list),
    create: [
        bodyDataHas("table_name"),
        bodyDataHas("capacity"),
        checkValidCapacity,
        checkValidTableName,
        asyncErrorBoundary(create)
    ],
    update: [
        bodyDataHas("reservation_id"),
        checkTableExists,
        checkReservationExists,
        checkTableSize,
        checkIfOccupied,
        asyncErrorBoundary(update),
    ],
}