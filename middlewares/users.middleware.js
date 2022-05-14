const { User } = require("../models/user.model");

// JWT
const jwt = require("jsonwebtoken");

// utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

// Token
const protectToken = catchAsync(async (req, res, next) => {
  let token;

  // Extract token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.header.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("invalid session", 403));
  }

  // validate token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user) {
    return next(new AppError("The owner of this token is not available", 403));
  }

  req.sessionUser = user;
  next();
});

const protectEmployee = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== "employee") {
    return next(new AppError("Access not granted", 403));
  }

  next();
});

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id, status: "active" },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return next(new AppError("User not found with id", 404));
  }

  req.user = user;
  next();
});

module.exports = { userExist, protectToken, protectEmployee };
