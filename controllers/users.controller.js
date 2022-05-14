const { User } = require("../models/user.model");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

// bcrypt
const bcrypt = require("bcryptjs");

// utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

// dotenv config
dotenv.config({ path: "./config.env" });

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  res.status(201).json({
    users,
  });
});

const createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hasPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hasPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({ newUser });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(201).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(201).json({
    status: "success",
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({
    status: "Account disabled",
  });

  res.status(200).json({
    status: "success",
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // validate
  const user = await User.findOne({
    where: { email, status: "active" },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid Credentials", 400));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(201).json({
    user,
    token,
  });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
};
