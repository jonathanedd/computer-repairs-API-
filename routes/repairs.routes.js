const express = require("express");

//middleware
const { repairExist } = require("../middlewares/repairs.middleware");

const {
  protectEmployee,
  protectToken,
} = require("../middlewares/users.middleware");

const {
  createRepairValidation,
  checkValidation,
} = require("../middlewares/validations.middleware");

//controller
const {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
  getCompletedRepairs,
} = require("../controllers/repairs.controller");

//Router
const router = express.Router();

router.use(protectToken);

// petitions
router.get("/completed", getCompletedRepairs);
router.get("/pending", getAllRepairs);

router.route("/").post(createRepairValidation, checkValidation, createRepair);

router
  .route("/:id")
  .get(repairExist, protectEmployee, getRepairById)
  .patch(repairExist, protectEmployee, updateRepair)
  .delete(repairExist, protectEmployee, deleteRepair);

module.exports = { repairRouter: router };
