const express = require("express");

//middleware
const {
  userExist,
  protectToken,
  protectAccountOwner,
} = require("../middlewares/users.middleware");

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
  checkToken,
} = require("../controllers/users.controller");

//Router
const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(createUserValidation, checkValidation, createUser);

// HTTP verbs endpoints
router.post("/login", login);

// Apply token
router.use(protectToken);
router.get("/check-token", checkToken);

router
  .route("/:id")
  .get(userExist, getUserById)
  .patch(userExist, protectAccountOwner, updateUser)
  .delete(userExist, protectAccountOwner, deleteUser);

module.exports = { userRouter: router };
