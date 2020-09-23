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
router.get('/profile', 
passport.authenticate('customer', {session: false}), 
customerController.getProfile)


// Edit profile
router.put('/profile', passport.authenticate('customer', {session: false}), customerValidator.isValidEditForm, customerController.editProfile);


// Add item to shopping cart
router.post('/shopping-carts', passport.authenticate('customer', {session: false}), 
customerValidator.isValidItem, customerController.addItemToShoppingCart);


// Get shopping cart items
router.get('/shopping-carts', passport.authenticate('customer', {session: false}), 
customerController.getShoppingCart);


// Edit shopping cart item
router.put('/shopping-carts/:itemId', passport.authenticate('customer', {session: false}), 
customerValidator.isValidEditItem, customerController.editItemOfShoppingCart);



// Delete shopping cart item
router.delete('/shopping-carts/:itemId', passport.authenticate('customer', {session: false}), 
customerController.deleteItemOfShoppingCart);


// Purchase shopping cart
router.post('/purchase', passport.authenticate('customer', {session: false}),
customerValidator.isValidOrderShipping, 
customerController.purchase);



// Get all orders of customer
router.get('/orders', passport.authenticate('customer', {session: false}), 
customerController.getAllOrders);


// Get order of customer
router.get('/orders/:orderId', passport.authenticate('customer', {session: false}), 
customerController.getOrder);


module.exports = router;
