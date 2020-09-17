const express = require('express');
const router = express.Router();
const passport = require('../auth/auth');
const { customerValidator } = require('../validation/middlewares/index');
const { customerController } = require('../controller/index');


// Add customer
router.post('/signup', customerValidator.isValidRegisterForm, customerController.create);


// login customer
router.post('/login', customerValidator.isValidloginForm, customerController.login);


// Get profile
router.get('/profile', passport.authenticate('customer', {session: false}), customerController.getProfile)


// Edit profile
router.put('/profile', passport.authenticate('customer', {session: false}), customerValidator.isValidEditForm, customerController.editProfile);


// login customer
router.post('/shopping-carts', passport.authenticate('customer', {session: false}), 
customerValidator.isValidItem, customerController.addItemToShoppingCart);


module.exports = router;
