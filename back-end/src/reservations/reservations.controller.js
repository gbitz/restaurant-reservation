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

function checkDayOfWeek(req,res,next) {
  const {reservation_date} = req.body.data;
  const testDate = new Date(reservation_date)
  // console.log(testDate)
  // console.log(testDate.getDay())
  if (testDate.getDay() != "1") {
    return next();
  }
  next({status:400, message:`Restaurant closed on Tuesdays`})
}

function checkFutureDate(req,res,next) {
  const today = new Date();
  const {reservation_date, reservation_time} = req.body.data;
  const testDate =  new Date(`${reservation_date} ${reservation_time}`)
  // console.log((today.getTime() < testDate.getTime()))
  if (today.getTime() < testDate.getTime()) {
    return next();
  }
  next({status:400, message:`Reservation must be in the future`})
}

function checkValidTime(req,res,next) {
  const {reservation_time} = req.body.data;
  const testTime = reservation_time;
  const openTime = "10:30";
  const closeTime = "21:30";
  // console.log(testTime);
  if (testTime >= openTime && testTime <= closeTime){
    return next();
  }
  next({status:400, message:`Time must be between 10:30 AM and 9:30 PM`})
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
    checkDayOfWeek,
    checkFutureDate,
    checkValidTime,
    asyncErrorBoundary(create)
  ]
};
