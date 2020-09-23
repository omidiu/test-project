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





module.exports = router;
