const express = require('express');
const router = express.Router();
const passport = require('../auth/auth');
const { driverValidator } = require('../validation/middlewares/index');
const { driverController } = require('../controller/index');


// Add customer
router.post('/signup', driverValidator.isValidRegisterForm, driverController.create);


// login customer
router.post('/login', driverValidator.isValidloginForm, driverController.login);


// Get all unassign orders
router.get('/orders/new-orders', 
passport.authenticate('driver', {session: false}), 
driverController.getAllUnAssignOrders);



// Get unassign order
router.get('/orders/new-orders/:orderId', 
passport.authenticate('driver', {session: false}), 
driverController.getOneUnAssignOrder);



// Accept unassign order
router.put('/orders/new-orders/:orderId/accept', 
passport.authenticate('driver', {session: false}), 
driverController.acceptOrder);



// Get all orders of driver
router.get('/orders/my-orders', 
passport.authenticate('driver', {session: false}), 
driverController.allOrdersOfDriver);




module.exports = router;
