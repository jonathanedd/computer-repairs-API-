const express = require("express");

//middleware
const { repairExist } = require("../middlewares/repairs.middleware");
const {
  createRepairValidation,
  checkValidation,
} = require("../middlewares/validations.middleware");

// const { protectEmployee } = require("../middlewares/users.middleware");

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

// petitions
router.get("/completed", getCompletedRepairs);
router.get("/pending", getAllRepairs);

router.route("/").post(createRepairValidation, checkValidation, createRepair);

router
  .route("/:id")
  .get(repairExist, getRepairById)
  .patch(repairExist, updateRepair)
  .delete(repairExist, deleteRepair);

module.exports = { repairRouter: router };
