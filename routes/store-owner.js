const express = require('express');
const router = express.Router();
const passport = require('../auth/auth');
const { generalValidator } = require('../validation/middlewares/index');
const { storeOwnerController } = require('../controller/index');


// Add customer
router.post('/signup', generalValidator.isValidRegisterForm, storeOwnerController.create);


// login customer
router.post('/login', generalValidator.isValidloginForm, storeOwnerController.login);


// test
router.get('/secure', passport.authenticate('storeOwner', {session: false}), (req, res) => {
  res.send(req.user);
});

module.exports = router;
