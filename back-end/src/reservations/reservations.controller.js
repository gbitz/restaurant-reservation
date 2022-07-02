const service = require("./reservations.service");
const tableService= require("../tables/tables.service")
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

function checkValidNewStatus(req, res, next) {
  const {status} = req.body.data;
  if (status === "booked" || !status){
    return next();
  }
  next({status: 400, message: `status must start as 'booked' and not '${status}'`})
}

function checkValidStatus(req,res,next) {
  const {status} = req.body.data;
  if (status === "booked" || status === "seated" || status === "finished" || status ==="cancelled") {
    return next();
  }
  next({status: 400, message: `status '${status}' is unknown`})
}

function checkStatusFinished(req,res,next) {
  const {status} = res.locals.reservation;
  status
  if (status === "booked" || status === "seated") {
    return next();
  }
  next({status: 400, message: `'finished' status cannot be updated`})

}

function checkDayOfWeek(req,res,next) {
  const {reservation_date} = req.body.data;
  const testDate = new Date(reservation_date)
  if (testDate.getDay() != "1") {
    return next();
  }
  next({status:400, message:`Restaurant closed on Tuesdays`})
}

function checkFutureDate(req,res,next) {
  const today = new Date();
  const {reservation_date, reservation_time} = req.body.data;
  const testDate =  new Date(`${reservation_date} ${reservation_time}`)
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
  if (testTime >= openTime && testTime <= closeTime){
    return next();
  }
  next({status:400, message:`Time must be between 10:30 AM and 9:30 PM`})
}

/**
 * List handler for reservation resources depending on query params
 */
async function list(req, res) {
  const {date, mobile_number} = req.query;
  if (mobile_number) {
    const data =  await service.search(mobile_number)
    res.json({ data });
  } else if (date) {
    const data = await service.list(date);
    res.json({ data });
  }

}

/**
 * Create handler for reservation resources
*/
async function create(req, res) {
  // const {data : {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = {} } = req.body
  const reservation = await service.create(req.body.data);
  res.status(201).json({data: reservation})
}

/**
 * Checks to see if reservation exists
 */
async function reservationExists(req,res,next) {
  const foundReservation = await service.read(req.params.reservation_id);

  if (foundReservation) {
    res.locals.reservation = foundReservation;
    return next();
  }
  next({status: 404, message: `Reservation ${req.params.reservation_id} Not Found in Records`})
}


/**
 * Read handler for reservation resource
 */
async function read(req, res) {
  const {reservation} = res.locals
  res.json({data : reservation})
}

/**
 * Updates reservation status 
 */
async function updateStatus(req,res,next) {
  const {reservation} = res.locals;
  const {status} = req.body.data;
  const updateReservation = {
    ...reservation,
    status: status
  }
  const data = await service.update(updateReservation)
  res.status(200).json({data})
}

/**
 * Updates an existing reservation
 */
async function update(req,res,next) {
  const {reservation} = res.locals;
  const updatedReservation = {
    ...reservation,
    ...req.body.data
  }
  const data = await service.update(updatedReservation)
  res.status(200).json({data})
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
    checkValidNewStatus,
    checkDateType,
    checkTimeType,
    checkPeopleType,
    checkDayOfWeek,
    checkFutureDate,
    checkValidTime,
    asyncErrorBoundary(create)
  ],
  read: [
    reservationExists,
    asyncErrorBoundary(read)
  ],
  updateStatus: [
    reservationExists,
    checkValidStatus,
    checkStatusFinished,
    asyncErrorBoundary(updateStatus)
  ],
  update: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    reservationExists,
    checkDateType,
    checkTimeType,
    checkValidTime,
    checkDayOfWeek,
    checkFutureDate,
    checkPeopleType,
    asyncErrorBoundary(update)

  ]
};
