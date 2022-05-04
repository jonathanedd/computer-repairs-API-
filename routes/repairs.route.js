const express = require("express");


//middleware
const { repairExist } = require('../middlewares/repairs.middleware');

//Router
const router = express.Router();


//controller
const { 
    getAllRepairs, 
    createRepair,
    getRepairById,
    updateRepair,
    deleteRepair
} = require('../controllers/repairs.controller');


router
    .route('/')
    .get(getAllRepairs)
    .post(createRepair)

router.route('/:id')
    .get(repairExist, getRepairById)
    .patch(repairExist, updateRepair)
    .delete(repairExist, deleteRepair)



module.exports = { repairRouter: router };