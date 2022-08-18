import express from 'express';

import {body} from 'express-validator';

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
    '/signup',
    [
        body('firstName').trim().not().isEmpty(),
        body('lastName').trim().not().isEmpty(),
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom(async (email: any) => {
                const user = await User.find(email);
                if (user[0].length > 0) {
                    return Promise.reject('EmailExist');
                }
            })
            .normalizeEmail(),
        body('address').trim().not().isEmpty(),
        body('contactNumber').trim().not().isEmpty(),
        body('password').trim().isLength({min: 7}),
    ],
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;
