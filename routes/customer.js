const express = require('express');
const router = express.Router();
const passport = require('../auth/auth');
const { generalValidator } = require('../validation/middlewares/index');
const { customerController } = require('../controller/index');


// Add customer
router.post('/signup', generalValidator.isValidRegisterForm, customerController.create);


// login customer
router.post('/login', generalValidator.isValidloginForm, customerController.login);


// Get profile
router.get('/profile', passport.authenticate('customer', {session: false}), customerController.getProfile)




module.exports = router;
