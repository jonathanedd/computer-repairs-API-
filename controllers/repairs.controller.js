const { Repairs } = require('../models/repairs.models');

const getAllRepairs = async (req, res) => {
    try {
        const repairs = await Repairs.findAll();

        res.status(200).json({
            repairs,
        });

    } catch (error) {
        console.log(error);
    }
};



const createRepair = async (req, res) => {
    try {
        const { date, status, userId} = req.body
        const newRepair  = await Repairs.create({
            date: date,
            status: status,
            userId: userId
        });

        res.status(201).json({ newRepair });

    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getAllRepairs,
    createRepair,
}