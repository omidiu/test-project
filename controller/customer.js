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

    return res.send(req.user);
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
