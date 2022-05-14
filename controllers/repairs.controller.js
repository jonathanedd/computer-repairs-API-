const { Repairs } = require("../models/repairs.models");
const { User } = require("../models/user.model");

// utils
const { catchAsync } = require("../utils/catchAsync");
// const { AppError } = require("../utils/appError");

// completed repairs
const getCompletedRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repairs.findAll({
    where: { status: "completed" },
    include: [{ model: User, attributes: ["id", "name", "email"] }],
  });

  res.status(201).json({
    repairs,
  });
});

// pending repairs
const getAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repairs.findAll({
    where: { status: "pending" },
    include: [{ model: User }],
  });

  res.status(200).json({
    repairs,
  });
});

const createRepair = catchAsync(async (req, res) => {
  const { date, userId, computerNumber, comments } = req.body;

  const newRepair = await Repairs.create({
    date,
    userId,
    computerNumber,
    comments,
  });

  res.status(201).json({ newRepair });
});

const getRepairById = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(201).json({
    repair,
  });
});

const updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: "completed" });

  res.status(201).json({ status: "success" });
});

const deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: "canceled" });

  res.status(201).json({
    status: "success",
  });
});

module.exports = {
  getCompletedRepairs,
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
