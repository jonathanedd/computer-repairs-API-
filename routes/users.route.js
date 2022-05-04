const  express  = require('express');

//middleware
const { userExist } = require('../middlewares/users.middleware');

// middleware validation
const { createUserValidation, checkValidation } = require('../middlewares/validations.middleware');

//Router
const router = express.Router();

//Controller
const { 
    getAllUsers,
    createUser,
    getUserById,
    updateUser, 
    deleteUser
} = require('../controllers/users.controller');


 

// HTTP verbs endpoints
router
    .route('/')
    .get(getAllUsers)
    .post(createUserValidation, checkValidation, createUser)

router
    .route('/:id')
    .get(userExist, getUserById)
    .patch(userExist, updateUser)
    .delete(userExist, deleteUser);

module.exports = { userRouter: router }