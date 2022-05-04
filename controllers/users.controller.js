
const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(201).json({
            users,
        })

    } catch (error) {
       console.log(error); 
    }
};


const createUser = async (req, res ) => {
    try {
        const { name, email, password} = req.body;

        const newUser = await User.create({
            name: name,
            email: email,
            password: password,
        })

        res.status(201).json({ newUser })
        
    } catch (error) {
        console.log(error);
    }
};

const getUserById = async (req, res ) => {
    try {
        
        const { user } = req;

        res.status(201).json({
            user
        })
    } catch (error) {
        console.log(error);
    }
};


const updateUser = async (req, res) => {
    try {
        const { user } = req;
        const { name, email } = req.body;

        await user.update({name, email})

        res.status(201).json({
            status: 'success'
        })
    } catch (error) {
        console.log(error);
    };
};


const deleteUser = async (req, res) => {
    try {
        
        const { user } = req;

        await user.update({
            status: 'Account disabled'
        });

        res.status(200).json({
            status: 'success'
        })
    } catch (error) {
        console.log(error);
    }
};



module.exports = { 
    getAllUsers,
    createUser ,
    getUserById,
    updateUser,
    deleteUser,
}
