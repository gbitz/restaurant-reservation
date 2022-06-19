const service = require("./reservations.service");
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

function checkDateType(req,res,next) {
  const validDateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
  const {reservation_date} = req.body.data;
  if (validDateRegex.test(reservation_date)) {
    return next();
  }
  next({status : 400, message: `reservation_date must be type 'date'`})
}

function checkTimeType(req,res,next) {
  const validTimeRegex = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
  const {reservation_time} = req.body.data;
  console.log(validTimeRegex.test(reservation_time))
  if (validTimeRegex.test(reservation_time)) {
    return next();
  }
  next({status : 400, message: `reservation_time must be type 'time'`})
}

function checkPeopleType(req,res,next) {
  const {people} = req.body.data;
  if (Number.isInteger(people)) {
    return next();
  }
  next({status : 400, message: `people must be type 'number'`})
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const reservation_date = req.query.date;
  const data = await service.list(reservation_date);
  res.json({ data });
}

/**
 * Create handler for reservation resources
*/
async function create(req, res) {
  // const {data : {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = {} } = req.body
  const reservation = await service.create(req.body.data);
  res.status(201).json({data: reservation})
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    checkDateType,
    checkTimeType,
    checkPeopleType,
    asyncErrorBoundary(create)
  ]
};
