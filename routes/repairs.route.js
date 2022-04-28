const express = require("express");



//controller
const { 
    getAllRepairs, 
    createRepair,
    getRepairById,
    updateRepair,
} = require('../controllers/repairs.controller');

const router = express.Router();


router.get('/', getAllRepairs);

router.post('/', createRepair);

router.get('/:id', getRepairById);

router.patch('/:id', updateRepair);

 


module.exports = { repairRouter: router };