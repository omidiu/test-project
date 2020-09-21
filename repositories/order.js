const MyError = require('../utils/error');
const { Order } = require('../models/index');
const mongoose = require('mongoose');

/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async ( products, shipping, stores, payment, customerId ) => {
  try {

    await Order.create({ products, shipping, stores, payment, customerId });
    

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find order by id 
**********************************************************************************/
exports.findById = async ( orderId ) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValidId) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
    }
  
    // return await Order.findOne( {_id: orderId} )
    return await Order.aggregate([
      {
        $unwind:  "$products"

      },  
      {
        $lookup: 
        {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productArray"
        }
      } 
      
    ])
    

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




/*********************************************************************************
* Find all orders of customer 
**********************************************************************************/
exports.findAllOrdersOfCustomer = async ( customerId ) => {
  try {

    
    return await Order.find({ customerId });
    

  } catch (err) {
    throw err
  }
};

