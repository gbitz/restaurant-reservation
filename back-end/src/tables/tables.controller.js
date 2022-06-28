const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


/**
 * Lists all tables 
 */
async function list(req, res){
    const data = await service.list();
    res.json({data})
}

module.exports ={
    list: asyncErrorBoundary(list),
}