const  express  = require('express');


//Controller
const { 
    getAllUsers,
    createUser,
    getUserById,
    updateUser, 
    deleteUser
} = require('../controllers/users.controller');


const router = express.Router(); 

// HTTP GET
router.get('/', getAllUsers); 

router.post('/', createUser );

router.get('/:id', getUserById);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);



module.exports = { userRouter: router }