const MyError = require('../lib/error');
const { StoreOwner } = require('../models/index');



/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async (name, username, hashedPassword, phoneNumber) => {
  try {

    await StoreOwner.create({ name, password: hashedPassword, phoneNumber, username });

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find by id
**********************************************************************************/
exports.findById = async ( storeOwnerId ) => {
  try {
    return await StoreOwner.findById({ _id: storeOwnerId });
  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find by phone number
**********************************************************************************/
exports.findByPhoneNumber = async ( phoneNumber ) => {
  try {
    return await StoreOwner.findOne({ phoneNumber });
  } catch (err) {
    throw err;
  }
  
};

/*********************************************************************************
* Find by username
**********************************************************************************/
exports.findByUsername = async ( username ) => {
  try {
    return await StoreOwner.findOne({ username });
  } catch(err) {
    throw err
  }
  
};

exports.verify = async (storeOwnerId) => {
  try {
    await StoreOwner.findByIdAndUpdate({_id: storeOwnerId}, {isVerified: true});
  } catch (err) {
    throw err;
  } 
}

