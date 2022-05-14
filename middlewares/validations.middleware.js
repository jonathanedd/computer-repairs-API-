const { body, validationResult } = require("express-validator");
const { AppError } = require("../utils/appError");

const createRepairValidation = [
  body("date").notEmpty().withMessage("Enter a valid date"),
  body("computerNumber").notEmpty().withMessage("enter a computer number"),
  body("comments").notEmpty().withMessage("Provide a comment description"),
];

const createUserValidation = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => {
      return error.msg;
    });

    const errorMsg = messages.join(". ");

    return next(new AppError(errorMsg, 400));
  }
  next();
};

module.exports = {
  createRepairValidation,
  createUserValidation,
  checkValidation,
};
