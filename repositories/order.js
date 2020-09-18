const MyError = require('../utils/error');
const { Order } = require('../models/index');
const mongoose = require('mongoose');

/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async ( products, shipping, status, payment, customerId ) => {
  try {

    await Order.create({ products, shipping, status, payment, customerId });
    

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find order of customer 
**********************************************************************************/
exports.findOrderOfCustomer = async ( orderId, customerId ) => {
  try {

    const isValidId = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValidId) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
    }
    return await Order.findOne({ _id: orderId, customerId });
    

  } catch (err) {
    throw err
  }
};
