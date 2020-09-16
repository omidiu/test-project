const { customerService } = require('../services/index');




/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async (req, res, next) => {
  try {
    // Get Customer information
    const { name, username, password, phoneNumber } = req.body;
    await customerService.register(name, username, password, phoneNumber);
    
    res.status(200).json({
      "message": "Your account created successfully"
    });

  } catch (err) {
    next(err);
  }
};


/*********************************************************************************
* login
**********************************************************************************/
exports.login = async (req, res, next) => {
  try {

    // Get Customer login info
    const { username, password } = req.body;
    const token = await customerService.login(username, password); // return token
    
    return res.status(200).json({
      token
    })

  } catch (err) {
    next(err);
  }
};


/*********************************************************************************
* login
**********************************************************************************/
exports.getProfile = async (req, res, next) => {
  try {
    const customer = await customerService.getProfile(req.user);
    return res.send(customer);
  } catch (err) {
    next(err);
  }
};


/*********************************************************************************
* Edit profile
**********************************************************************************/
exports.editProfile = async (req, res, next) => {
  try {
    // Get Customer information
    const { name, username } = req.body;
    await customerService.editProfile(name, username, req.user._id);
    
    res.status(200).json({
      "message": "Your account edited successfully"
    });

  } catch (err) {
    next(err);
  }
};
