const { password } = require('pg/lib/defaults');
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
}

module.exports = { getAllUsers, createUser }
