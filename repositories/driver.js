const MyError = require('../lib/error');
const { Driver } = require('../models/index');



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

