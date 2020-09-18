const MyError = require('../utils/error');
const { Driver } = require('../models/index');
const mongoose = require('mongoose');


/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async (name, username, hashedPassword, phoneNumber) => {
  try {

    await Driver.create({ name, password: hashedPassword, phoneNumber, username });

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find by id
**********************************************************************************/
exports.findById = async ( driverId ) => {
  try {


    const isValidId = mongoose.Types.ObjectId.isValid(driverId);
    if (!isValidId) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
    }
      

    return await Driver.findById({ _id: driverId });
  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find by phone number
**********************************************************************************/
exports.findByPhoneNumber = async ( phoneNumber ) => {
  try {
    return await Driver.findOne({ phoneNumber });
  } catch (err) {
    throw err;
  }
  
};


/*********************************************************************************
* Find by username
**********************************************************************************/
exports.findByUsername = async ( username ) => {
  try {
    return await Driver.findOne({ username });
  } catch(err) {
    throw err
  }
  
};


exports.verify = async (driverId) => {
  try {
    await Driver.findByIdAndUpdate({_id: driverId}, {isVerified: true});
  } catch (err) {
    throw err;
  } 
}


