const { User } = require('../models/user.model');



const userExist = ( req, res, next) => {
    try {
        const { id } = req.params;
        const user = User.findOne({ where: { id }})

        if(!user){

            return res.status(404).json({
                status:'error',
                message:'User not found with id'
            })
        };

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    };
};

module.exports = { userExist };