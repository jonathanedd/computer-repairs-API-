const  express  = require('express');


//Controller
const { 
    getAllUsers,
    createUser, 
} = require('../controllers/users.controller');


const router = express.Router(); 

// HTTP GET
router.get('/', getAllUsers); 

router.post('/', createUser );



module.exports = { userRouter: router }