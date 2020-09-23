const { driverService } = require('../services/index');




/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async (req, res, next) => {
  try {
    // Get Customer information
    const { name, username, password, phoneNumber } = req.body;
    await driverService.register(name, username, password, phoneNumber);
    
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
    const token = await driverService.login(username, password); // return token
    
    return res.status(200).json({
      token
    })

  } catch (err) {
    next(err);
  }
};



/*********************************************************************************
* Get all unassign orders (and of course completed )
**********************************************************************************/
exports.getAllUnAssignOrders = async (req, res, next) => {
  try {
    
    const orders = await driverService.findAllUnAssignAndCompletedOrdersForDriver();
    
    res.status(200).json({
      orders
    });

  } catch (err) {
    next(err);
  }
};



/*********************************************************************************
* Get unassign order and of course completed 
**********************************************************************************/
exports.getOneUnAssignOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await driverService.findOneUnAssignAndCompletedOrder(orderId);
    
    res.status(200).json({
      order
    });

  } catch (err) {
    next(err);
  }
};



/*********************************************************************************
* Get unassign order and of course completed 
**********************************************************************************/
exports.acceptOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const driverId = req.user;
    const order = await driverService.acceptOrder(orderId, driverId);
    
    res.status(200).json({
      order
    });

  } catch (err) {
    next(err);
  }
};

