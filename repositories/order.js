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