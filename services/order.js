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


/*********************************************************************************
* Find order of Customer
**********************************************************************************/
exports.findOrderOfCustomer = async ( orderId, customerId ) => {
  try {
    
    const order = await orderRepository.findOrderOfCustomer( orderId, customerId );
    return order;

  } catch (err) {
    throw err;
  }
};




