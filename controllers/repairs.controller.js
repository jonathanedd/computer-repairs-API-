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


const getRepairById = async (req, res) => {
    try {
        const { id } = req.params;
        const repair = await Repairs.findOne({where: { id }});

        if(!repair){
            return res.status(404).json({
                status: 'error',
                message: 'Repair not found with id'
            })
        }

        res.status(201).json({
            repair
        });


    } catch (error) {
        console.log(error);
    }
};

const updateRepair = async (req, res ) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const repair = await Repairs.findOne({where: { id }});

        if(!repair){
            return res.status(404).json({
                status: 'error',
                message: 'repair not found with id'
            })
        }

        await repair.update({ status });

        res.status(201).json({
            status: 'completed'
        });

    } catch (error) {
        console.log(error);
    }
};


const deleteRepair = async (req, res) => {
    try {
        const { id } = req.params;

        const repair = await Repairs.findOne({where: { id }});

        await repair.update({
            status: 'canceled'
        });

        res.status(201).json({
            status: 'success'
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllRepairs,
    createRepair,
    getRepairById,
    updateRepair,
    deleteRepair
}