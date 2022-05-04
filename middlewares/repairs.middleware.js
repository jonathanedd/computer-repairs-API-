const { Repairs } = require('../models/repairs.models');


const repairExist = (req, res, next ) => {
    try {
        const { id } = req.params;
        const repair = Repairs.findOne({where: { id }});

        if(!repair){
            return res.status(404).json({
                status:'error',
                message:'Repair not found with id'
            });
        };


        req.repair = repair
        next();
    } catch (error) {
        console.log(error);
    };
};

module.exports = { repairExist };
