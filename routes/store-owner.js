const express = require('express');
const router = express.Router();
const passport = require('../auth/auth');
const { storeOwnerValidator } = require('../validation/middlewares/index');
const { storeOwnerController } = require('../controller/index');


// Add customer
router.post('/signup', 
storeOwnerValidator.isValidRegisterForm,
storeOwnerController.create);


// login customer
router.post('/login', 
storeOwnerValidator.isValidloginForm, 
storeOwnerController.login);


// Create store
router.post('/stores', 
passport.authenticate('storeOwner', {session: false}), 
storeOwnerValidator.isValidStoreInformation, 
storeOwnerController.createStore);


// Get all product of store
router.get('/products', 
passport.authenticate('storeOwner', {session: false}), 
storeOwnerController.getAllProductsOfStore);


// Create product
router.post('/products', 
passport.authenticate('storeOwner', {session: false}), 
storeOwnerValidator.isValidProductInformation, 
storeOwnerController.addProduct);



// Get a product of store
router.get('/products/:productId', 
passport.authenticate('storeOwner', {session: false}), 
storeOwnerController.getProductOfStore);


// Get orders of customer
router.get('/orders', 
passport.authenticate('storeOwner', {session: false}), 
storeOwnerController.getOrders);


// Get one order of customer
router.get('/orders/:orderId', 
passport.authenticate('storeOwner', {session: false}), 
storeOwnerController.getOrder);


// test
router.get('/secure', 
passport.authenticate('storeOwner', {session: false}), (req, res) => {
  res.send(req.user);
});

module.exports = router;
