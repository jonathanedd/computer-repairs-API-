const { body, validationResult } = require('express-validator');


const createUserValidation = [

    body('name')
        .notEmpty()
        .withMessage('Name cannot be empty'),
    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Must be a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min : 6 })
        .withMessage('Password must be at least 6 characters')

];


const checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const messages = errors.array().map( error => {
            return error.msg
        });

        const errorMsg = messages.join('. ');

        return res.status(400).json({
            status:'error',
            message: errorMsg
        })
    }
    next();
}




module.exports = {
    createUserValidation,
    checkValidation
}