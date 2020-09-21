const MyError = require('../utils/error');
const { Product } = require('../models/index');
const mongoose = require('mongoose');


/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async (name, price, quantity, storeId) => {
  try {

    const product = await Product.create({ name, price, quantity, storeId });
    return product;
  } catch (err) {
    throw err
  }
};



/*********************************************************************************
* Get a product by id
**********************************************************************************/
exports.findById = async (productId) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(productId);
    if (!isValidId)
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
    return await Product.findById(productId);

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Get products by ids
**********************************************************************************/
exports.findByIds = async (productsIds) => {
  try {
    for (let index = 0; index < productsIds.length; index++) {
      
    if (!mongoose.Types.ObjectId.isValid(productsIds[index]))
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
    }
    
    return await Product.find(
      {
       '_id': 
       { 
         $in: productsIds
       }
      }
    );

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Decrease quantity of product
**********************************************************************************/
exports.decreaseQuantityOfProduct = async (minus, productId) => {
  try {
    

    await Product.update(
      { _id: productId },
      { $inc: { quantity: minus } }
    )

  } catch (err) {
    throw err
  }
};



/*********************************************************************************
* Get all products of store
**********************************************************************************/
exports.getAllProductsOfStore = async ( storeId ) => {
  try {

    const isValidId = mongoose.Types.ObjectId.isValid(storeId);
    if (!isValidId) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Not valid id'
      });
    }

    return await Product.find({storeId});
    

  } catch (err) {
    throw err
  }
};
