const express = require('express');
const router = express.Router();
const { generalValidator } = require('../validation/middlewares/index');
const { driverController } = require('../controller/index');


// Add customer
router.post('/signup', generalValidator.isValidRegisterForm, driverController.create);


// login customer
router.post('/login', generalValidator.isValidloginForm, driverController.login);




module.exports = router;
