const MyError = require('../lib/error');
const { Customer } = require('../models/index');
const mongoose = require('mongoose');


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
* Create 
**********************************************************************************/
exports.updateProfile = async (name, username, customerId) => {
  try {
    
    await Customer.findByIdAndUpdate({ _id: customerId }, {name, username});

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find by id
**********************************************************************************/
exports.findById = async ( customerId ) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(customerId);
    if (!isValidId)
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
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


/*********************************************************************************
* Push Item to shopping cart
**********************************************************************************/
exports.pushItemToShoppingCart = async ( productId, quantity, customerId ) => {
  console.log(`product id ${productId}`);
  console.log(`quantity id ${quantity}`);
  try {
    return await Customer.findOneAndUpdate({ _id: customerId }, 
      { $push: { shoppingCart: {productId: productId, quantity }}}, {
        new: true
      } );
  } catch(err) {
    throw err
  }
  
};



/*********************************************************************************
* Push Item to shopping cart
**********************************************************************************/
exports.deleteItemFromShoppingCart = async ( itemId, customerId ) => {
  try {
      await Customer.update(
        {_id: customerId}, 
        { $pull: { "shoppingCart" : { _id: itemId } } },
      );
  } catch(err) {
    throw err
  }
  
};
