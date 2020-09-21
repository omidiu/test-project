require('dotenv').config();
const MyError = require('../utils/error');
const { orderRepository } = require('../repositories/index');



/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async ( products, shipping, stores, payment, customerId ) => {
  try {
    
    await orderRepository.create( products, shipping, stores, payment, customerId );

  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Find orders of store
**********************************************************************************/
exports.findAllOrdersOfStore = async ( storeId ) => {
  try {
    
    const orders = await orderRepository.findAllOrdersOfStore( storeId );
    return orders;

  } catch (err) {
    throw err;
  }
};




/*********************************************************************************
* Find order of store
**********************************************************************************/
exports.findOrderOfStore = async ( storeId, orderId ) => {
  try {
    
    const order = await orderRepository.findOrderOfStore( storeId, orderId );
    return order;

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



/*********************************************************************************
* Find all orders of customer
**********************************************************************************/
exports.findAllOrdersOfCustomer = async ( customerId ) => {
  try {
    
    const orders = await orderRepository.findAllOrdersOfCustomer( customerId );
    return orders;

  } catch (err) {
    throw err;
  }
};


    



