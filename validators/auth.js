const {check}   =require('express-validator');

exports.userSignUpValidator =[
    check('name')
    .not()
    .isEmpty()
    .withMessage("Name is required!!"),

    check('email')
    .isEmail()
    .withMessage("Email must be valid"),

    check('password')
    .isLength({min:8})
    .withMessage('Password must be atleast 6 character long')
]

exports.userSignInValidator =[
    check('email')
    .isEmail()
    .withMessage("Email must be valid"),

    check('password')
    .isLength({min:8})
    .withMessage('Password must be atleast 6 character long')
]