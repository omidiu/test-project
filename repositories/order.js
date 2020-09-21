
const MyError = require('../utils/error');
const { Order } = require('../models/index');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
* Find by id 
**********************************************************************************/
exports.findById = async (orderId) => {
  try {

    return await Order.findById(orderId);

  } catch(err) {
    throw err;
  }
}


/*********************************************************************************
* Find order by id It's just change structure of order data for service 
**********************************************************************************/
exports.findOrderOfStore = async ( storeId, orderId ) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValidId) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
    }

    console.log("*********");
    console.log(orderId);
    console.log("*********");
    
    
    // return await Order.findOne( {_id: orderId} )
    return await Order.aggregate([ 
      {
        $match : { _id: ObjectId(orderId) }
      },
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
      },
    ])
    

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find orders by for store 
**********************************************************************************/
exports.findAllOrdersOfStore = async ( storeId ) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(storeId);
    if (!isValidId) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
    }
    
    return await Order.aggregate([
      {
        $match: { "stores.storeId": storeId }
      },
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
      },
      {
        $group: { 
          _id: "$_id",
          products: { $push: {product: "$products", storeId: "$productArray.storeId"} }
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


/*********************************************************************************
* Mark order ready from store  
**********************************************************************************/
exports.markOrderReadyFromStore = async ( orderId, storeId ) => {
  try {

    await Order.updateOne({ "stores.storeId": storeId }, {"$set": {
      "stores.$.isItReady": true
    }});


  } catch (err) {
    throw err;
  }
}