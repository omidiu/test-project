require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const MyError = require('../utils/error');
const { driverRepository } = require('../repositories/index');
const { objectUtil } = require('../utils/index')

const orderService = require('./order');

/*********************************************************************************
* Create 
**********************************************************************************/
exports.register = async ( name, username, password, phoneNumber ) => {
  try {
    
    // Check there is no account with this phone number
    if (await this.findByPhoneNumber(phoneNumber)) {
      throw new MyError(400, "There is an account with this phone number", new Error().stack, {
        message: "There is an account with this phone number"
      });
    }

    // Check there is no account with this username
    if (await this.findByUsername(username)) {
      throw new MyError(400, "There is an account with this phone number", new Error().stack, {
        message: "There is an account with this username"
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await driverRepository.create(name, username, hashedPassword, phoneNumber);

    return true;


  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* login
**********************************************************************************/
exports.login = async (username, password) => {
  try {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "There is no account with this username"
      });
    }

    // Check password
    if (! await bcrypt.compare(password, user.password) ) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "Password is not correct"
      });
    }

    // Create and assign a token
    const token = jwt.sign({ 
      _id: user._id,
      role: 'driver'
    }, process.env.TOKEN_SECRET);

    
    return token;

  } catch (err) {
    throw err;
  }
}


/*********************************************************************************
* Find by phone number
**********************************************************************************/
exports.findByPhoneNumber = async (phoneNumber) => {
  return await driverRepository.findByPhoneNumber(phoneNumber);
}


/*********************************************************************************
* Find by user name
**********************************************************************************/
exports.findByUsername = async (username) => {
  return await driverRepository.findByUsername(username);
}


/*********************************************************************************
* Find driver by id
**********************************************************************************/
exports.findById = async ( driverid ) => {
  try {
    
    const driver = await driverRepository.findById(driverid);

    return driver
    
  } catch (err) {
    throw err;
  }
};


exports.verify = async (driverId) => {
  try {

    await driverRepository.verify(driverId);

  } catch (err) {
    throw err;
  }
}



/*********************************************************************************
* Find all unassign and completed orders
**********************************************************************************/
exports.findAllUnAssignAndCompletedOrdersForDriver = async () => {
  try {

    // Get orders
    const orders = await orderService.findAllUnAssignAndCompletedOrdersForDriver();

    

    return orders;
  } catch (err) {
    throw err;
  }
}



/*********************************************************************************
* Find unassign and completed order by id
**********************************************************************************/
exports.findOneUnAssignAndCompletedOrder = async (orderId) => {
  try {

    // Get order (order array since aggregation)
    const orderArray = await orderService.findOrderForDriver(orderId);
    
    const order = orderArray[0];
    

    if (!order) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Not found"
      });
    }

    // Stores status was checked in aggregation

    // Not assigned to any driver was checked in aggregation
    


    return order;
  } catch (err) {
    throw err;
  }
}



/*********************************************************************************
* Accept order from driver
**********************************************************************************/
exports.acceptOrder = async (orderId, driverId) => {
  try {

    // Get order (order array since aggregation)
    const orderArray = await orderService.findOrderForDriver(orderId);
    
    // Single result ( but in aggregation )
    const order = orderArray[0];
    

    if (!order) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Not found"
      });
    }

    await orderService.acceptByDriver(orderId, driverId);


    
    // driver: {
    //   driverId: {
        
    //   },
    //   acceptedDate: {
        
    //   },
    //   status: {
        
    //   }
    

    // Stores status was checked in aggregation

    // Not assigned to any driver was checked in aggregation
    


    return order;
  } catch (err) {
    throw err;
  }
}


/*********************************************************************************
* Find all orders of driver
**********************************************************************************/
exports.allOrdersOfDriver = async (driverId) => {
  try {

    // Get order (order array since aggregation)
    const ordersArray = await orderService.findAllOrdersOfDriver(driverId);
    
    return ordersArray;
    

    if (!order) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Not found"
      });
    }

    await orderService.acceptByDriver(orderId, driverId);


    
    // driver: {
    //   driverId: {
        
    //   },
    //   acceptedDate: {
        
    //   },
    //   status: {
        
    //   }
    

    // Stores status was checked in aggregation

    // Not assigned to any driver was checked in aggregation
    


    return order;
  } catch (err) {
    throw err;
  }
}



/*********************************************************************************
* Change status of order
**********************************************************************************/
exports.changeStatusOfOrder = async (orderId, status, driverId) => {
  try {


    // Get order (order array since aggregation)
    const order = await orderService.findById(orderId);

    if ( !order || JSON.stringify( order.driver.driverId) !== JSON.stringify(driverId) ) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Not found"
      });
    }
    
    await orderService.changeStatusOfOrder(status, orderId);
    
    
    
    
  } catch (err) {
    throw err;
  }
}


