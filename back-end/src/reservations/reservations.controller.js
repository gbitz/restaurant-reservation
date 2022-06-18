const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const reservation_date = req.query.date;
  console.log(reservation_date)
  const data = await service.list(reservation_date);
  res.json({ data });
}

/**
 * Create handler for reservation resources
*/
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({data})
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create)
};
