
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

    const isValidId = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValidId)
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
    return await Order.findById(orderId);
    

  } catch(err) {
    throw err;
  }
}


/*********************************************************************************
* Find order with structure for driver 
**********************************************************************************/
exports.findOrderForDriver = (orderId) => {
  try {

    const isValidId = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValidId)
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
    return Order.aggregate([
      {
        $match: {
          _id: ObjectId(orderId),
          driver: { $exists: false}
        },
        
      },
      {
        $unwind: {
          path: "$stores"
        }
      }, 
      {
        $group: {
          _id: "$_id",
          stores: { $addToSet: '$stores' },
          customerId: {$first: "$customerId" },
          all_stores: { $sum: 1 },
          all_stores_that_ready: { $sum: { $cond: [ { $eq: [ '$stores.isItReady', true ] }, 1, 0 ] } },
        }
      }, 
      {
        $project: {
          _id: 1,
          stores: 1,
          customerId: 1,
          arrays_equal: { $cond: [ { $eq: [ '$all_stores', '$all_stores_that_ready' ] }, 1, 0 ] }
        }
      }, 
      {
        $match: {
          'arrays_equal' : 1
        }
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer'
        }
      }, 
      {
        $lookup: {
          from: 'stores',
          localField: 'stores.storeId',
          foreignField: '_id',
          as: 'stores'
        }
      },
      {
        $project: {
          customerInformation: {
            $arrayElemAt: [ '$customer', 0 ],

          },
          "shipping": 1,
          "stores": 1,
          "_id": 1
          
        }
      }, 
      {
        $project: {
          customerInformation: {
            name: 1,
            phoneNumber: 1
          },
          shipping: 1,
          stores: {
            name: 1,
            address: 1,
            lat: 1,
            long: 1
          }
        }
      }
      
    ]);
    

  } catch(err) {
    throw err;
  }
}


/*********************************************************************************
* Find all orders which completed and not assign to any drivers
**********************************************************************************/
exports.findAllUnAssignAndCompletedOrdersForDriver = () => {
  try {

    return Order.aggregate(
      [
        {
          $match: {
            driver: { $exists: false} 
          }
        },
        {
          $unwind: {
            path: "$stores"
          }
        }, 
        {
          $group: {
            _id: "$_id",
            stores: { $addToSet: '$stores' },
            customerId: {$first: "$customerId" },
            all_stores: { $sum: 1 },
            all_stores_that_ready: { $sum: { $cond: [ { $eq: [ '$stores.isItReady', true ] }, 1, 0 ] } },
          }
        }, 
        {
          $project: {
            _id: 1,
            stores: 1,
            customerId: 1,
            arrays_equal: { $cond: [ { $eq: [ '$all_stores', '$all_stores_that_ready' ] }, 1, 0 ] }
          }}, 
          {
            $match: {
              'arrays_equal' : 1
            }
          }, 
          {
            $lookup:{
              from: 'customers',
              localField: 'customerId',
              foreignField: '_id',
              as: 'customer'
            }
          }, 
          {
            $lookup: {
              from: 'stores',
              localField: 'stores.storeId',
              foreignField: '_id',
              as: 'stores'
            }
          }, 
          {
            $project: {
              customerInformation: {
                $arrayElemAt: [ '$customer', 0 ],
              },
              "shipping": 1,
              "stores": 1,
              "_id": 1
            }
          }, 
          {
            $project: {
              customerInformation: {
                name: 1,
                phoneNumber: 1
              },
              shipping: 1,
              stores: {
                name: 1,
                address: 1,
                lat: 1,
                long: 1
              }
            }
          }
      ]
    );

  } catch (err) {
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


/*********************************************************************************
* Accept order by driver
**********************************************************************************/
exports.acceptByDriver = async ( orderId, driverId ) => {
  try {

    await Order.updateOne({ _id: orderId }, {"$set": {
      "driver.driverId": driverId,
      "driver.acceptedDate": Date.now(),
      "driver.status": "accepted"
    }});


  } catch (err) {
    throw err;
  }
}

