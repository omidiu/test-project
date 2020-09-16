require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MyError = require('../lib/error');
const { adminRepository } = require('../repositories/index');

// const { driverService } = require('./index');
const driverService = require('./driver');
const storeOwnerService = require('./store-owner');


/*********************************************************************************
* login
**********************************************************************************/
exports.login = async (username, password) => {
  try {
    
    const admin = await this.findByUsername(username);
    if (!admin) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "username/password is not correct"
      });
    }

    // Check password
    if (! await admin.password === password ) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "username/password is not correct"
      });
    }

    // Create and assign a token
    const token = jwt.sign({ 
      _id: admin._id,
      role: 'admin'
    }, process.env.TOKEN_SECRET);

    
    return token;

  } catch (err) {
    throw err;
  }
}




/*********************************************************************************
* Find by user name
**********************************************************************************/
exports.findByUsername = async (username) => {
  return await adminRepository.findByUsername(username);
}


/*********************************************************************************
* Find admin by id
**********************************************************************************/
exports.findById = async ( _id ) => {
  try {
    
    const admin = await adminRepository.findById(_id);
    return admin

  } catch (err) {
    throw err;
  }
};

exports.verifyDriver = async ( driverId ) => {
  try {

    const driver = await driverService.findById(driverId);
    if (!driver) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Not found"
      });
    }
    
    await driverService.verify(driverId);


  } catch (err) {
    throw err;
  }
}


exports.verifyStoreOwner = async ( driverId ) => {
  try {

    const storeOwner = await storeOwnerService.findById(driverId);
    if (!storeOwner) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Not found"
      });
    }
    
    await storeOwnerService.verify(driverId);


  } catch (err) {
    throw err;
  }
}





/*********************************************************************************
* Get profile
**********************************************************************************/
// exports.getProfile = async (customerId) => {
//   try {
//     // Get customer
//     const customer = await this.findById(customerId);

//     // Cast to object
//     const customerObj = customer.toObject();

//     // Delete password
//     delete customerObj.password;
  
//     return customerObj;

//   } catch (err) {
//     throw err;
//   }
// };
