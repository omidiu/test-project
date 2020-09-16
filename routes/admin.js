const express = require('express');
const router = express.Router();
const passport = require('../auth/auth');
const { generalValidator } = require('../validation/middlewares/index');
const { adminController } = require('../controller/index');





// login customer
router.post('/login', generalValidator.isValidloginForm, adminController.login);


// Verify driver
router.post('/drivers/:driverId/verify', adminController.verifyDriver);


// Verify store owner
router.post('/store-owners/:storeOwnerId/verify', adminController.verifyStoreOwner);


// Add later passport.authenticate('admin', {session: false})


router.get('/secure', passport.authenticate('admin', {session: false}), (req, res) => {
  return res.send(req.user);
});






module.exports = router;
