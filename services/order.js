require('dotenv').config();
const MyError = require('../utils/error');
const { orderRepository } = require('../repositories/index');



/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async ( products, shipping, status, payment, customerId ) => {
  try {
    
    await orderRepository.create( products, shipping, status, payment, customerId );

  } catch (err) {
    throw err;
  }
};



