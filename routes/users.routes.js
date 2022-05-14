const express = require("express");

//middleware
const { userExist, protectToken } = require("../middlewares/users.middleware");

// middleware validation
const {
  createUserValidation,
  checkValidation,
} = require("../middlewares/validations.middleware");

//Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users.controller");

//Router
const router = express.Router();

// HTTP verbs endpoints
router.post("/login", login);

// Apply token
router.use(protectToken);

router
  .route("/")
  .get(getAllUsers)
  .post(createUserValidation, checkValidation, createUser);

router
  .route("/:id")
  .get(userExist, getUserById)
  .patch(userExist, updateUser)
  .delete(userExist, deleteUser);

module.exports = { userRouter: router };
