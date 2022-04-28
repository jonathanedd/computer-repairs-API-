const express = require("express");



//controller
const { 
    getAllRepairs, 
    createRepair
} = require('../controllers/repairs.controller');

const router = express.Router();


router.get('/', getAllRepairs);

router.post('/', createRepair);


module.exports = { repairRouter: router };