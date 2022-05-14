const { Repairs } = require("../models/repairs.models");

// utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const repairExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repairs.findOne({ where: { id, status: "pending" } });

  if (!repair) {
    return next(new AppError("No repair found with id"), 404);
  }

  req.repair = repair;
  next();
});

module.exports = { repairExist };
