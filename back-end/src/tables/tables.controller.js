const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

    if(capacity > 0) {
        return next();
    }
    next({status:400, message:`Capacity must be at least 1`})
}

function checkValidTableName(req, res,next) {
    const {table_name} = req.body.data;
    if (table_name.length >= 2) {
        return next()
    } 
    next({status:400, message:`Table Name must be at least 2 characters long`})

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

module.exports ={
    list: asyncErrorBoundary(list),
    create: [
        bodyDataHas("table_name"),
        bodyDataHas("capacity"),
        checkValidCapacity,
        asyncErrorBoundary(create)


    ]
}