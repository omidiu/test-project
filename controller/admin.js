const { adminService } = require('../services/index');






/*********************************************************************************
* login
**********************************************************************************/
exports.login = async (req, res, next) => {
  try {

    // Get Customer login info
    const { username, password } = req.body;
    const token = await adminService.login(username, password); // return token
    
    return res.status(200).json({
      token
    })

  } catch (err) {
    next(err);
  }
};


exports.verifyDriver = async (req, res, next) => {
  try {

    await adminService.verifyDriver(req.params.driverId);

    return res.status(200).json({
      message: "Driver verified successfully"
    });

  } catch (err) {
    next(err)
  }
}




exports.verifyStoreOwner = async (req, res, next) => {
  try {

    await adminService.verifyStoreOwner(req.params.storeOwnerId);

    return res.status(200).json({
      message: "Store owner verified successfully"
    });

  } catch (err) {
    next(err)
  }
}


/*********************************************************************************
* login
**********************************************************************************/
// exports.getProfile = async (req, res, next) => {
//   try {
//     const customer = await customerService.getProfile(req.user);
//     return res.send(customer);
//   } catch (err) {
//     next(err);
//   }
// };
