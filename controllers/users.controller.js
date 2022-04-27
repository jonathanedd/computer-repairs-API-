
const { User } = require('../models/user.model');

getAllUsers = async (req, res) => {
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
        const { id } = req.params;
        
        const user = await User.findOne({where: { id }});

        if(!user){
            return res.status(404).json({
                status: 'error',
                message: 'user does not exist with id'
            })
        };

        res.status(201).json({
            user
        })
    } catch (error) {
        console.log(error);
    }
};


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const { email } = req.body;
        const user = await User.findOne({where: { id }});

        if(!user){
            return res.status(404).json({
                status: 'error',
                message: 'user not found with id'
            })
        }

        await user.update({name, email})

        res.status(201).json({
            status: 'success'
        })
    } catch (error) {
        console.log(error);
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({where: { id }});

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
    deleteUser
}
