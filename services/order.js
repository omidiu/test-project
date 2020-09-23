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
* Find by id 
**********************************************************************************/
exports.findById = async (orderId) => {
  try {

    return await orderRepository.findById(orderId);

  } catch (err) {
    throw err;
  }
}



/*********************************************************************************
* Find all unassign and completed orders 
**********************************************************************************/
exports.findAllUnAssignAndCompletedOrdersForDriver = async () => {
  try {

    return orderRepository.findAllUnAssignAndCompletedOrdersForDriver();

  } catch (err) {
    throw err;
  }
}



/*********************************************************************************
* Find order of driver  (new)
**********************************************************************************/
exports.findOrderForDriver = async (orderId) => {
  try {

    return orderRepository.findOrderForDriver(orderId);

  } catch (err) {
    throw err;
  }
}


/*********************************************************************************
* Find order of driver  (owned)
**********************************************************************************/
exports.findOrderOfDriver = async (orderId, driverId) => {
  try {

    return orderRepository.findOrderOfDriver(orderId, driverId);

  } catch (err) {
    throw err;
  }
}



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


/*********************************************************************************
* Find all orders of driver
**********************************************************************************/
exports.findAllOrdersOfDriver = async ( driverid ) => {
  try {
    
    const orders = await orderRepository.findAllOrdersOfDriver( driverid );
    return orders;

  } catch (err) {
    throw err;
  }
};



/*********************************************************************************
* Mark order ready from store (of course one store)
**********************************************************************************/
exports.markOrderReadyFromStore = async ( orderId, storeId ) => {
  try {
    
    await orderRepository.markOrderReadyFromStore( orderId, storeId );
    

  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Accept order by driver
**********************************************************************************/
exports.acceptByDriver = async ( orderId, driverId ) => {
  try {
    
    await orderRepository.acceptByDriver( orderId, driverId );
    

  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Change status of order
**********************************************************************************/
exports.changeStatusOfOrder = async (status, orderId) => {
  try {
    
    await orderRepository.changeStatusOfOrder( status, orderId );
    

  } catch (err) {
    throw err;
  }
};

