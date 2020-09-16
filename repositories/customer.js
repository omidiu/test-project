const MyError = require('../lib/error');
const { Customer } = require('../models/index');



/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async (name, username, hashedPassword, phoneNumber) => {
  try {

    await Customer.create({ name, password: hashedPassword, phoneNumber, username });

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find by id
**********************************************************************************/
exports.findById = async ( customerId ) => {
  try {
    return await Customer.findById({ _id: customerId });
  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find by phone number
**********************************************************************************/
exports.findByPhoneNumber = async ( phoneNumber ) => {
  try {
    return await Customer.findOne({ phoneNumber });
  } catch (err) {
    throw err;
  }
  
};

/*********************************************************************************
* Find by username
**********************************************************************************/
exports.findByUsername = async ( username ) => {
  try {
    return await Customer.findOne({ username });
  } catch(err) {
    throw err
  }
  
};

