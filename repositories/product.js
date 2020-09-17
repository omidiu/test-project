const MyError = require('../lib/error');
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
* Get all products of store
**********************************************************************************/
exports.GetAllProductOfStore = async (storeId) => {
  try {
    
    return await Product.find({ storeId });

  } catch (err) {
    throw err
  }
};

