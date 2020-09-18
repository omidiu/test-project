const MyError = require('../utils/error');
const { productRepository } = require('../repositories/index');




/*********************************************************************************
* Create store
**********************************************************************************/
exports.create = async ( name, price, quantity, storeId ) => {
  try {
    
    return await productRepository.create(name, price, quantity, storeId);
    
  } catch (err) {
    throw err;
  }
};



/*********************************************************************************
* Find by id
**********************************************************************************/
exports.findById = async ( productId ) => {
  try {
    
    return await productRepository.findById(productId);
    
  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Find by ids
**********************************************************************************/
exports.findByIds = async ( productIds ) => {
  try {
    
    return await productRepository.findByIds(productIds);
    
  } catch (err) {
    throw err;
  }
};




/*********************************************************************************
* Decrease quantity
**********************************************************************************/
exports.decreaseQuantityOfProduct = async ( minus, productId ) => {
  try {
    
    await productRepository.decreaseQuantityOfProduct(minus, productId);
    
  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Get all products of store
**********************************************************************************/
exports.GetAllProductOfStore = async ( storeId ) => {
  try {
    
    return await productRepository.GetAllProductOfStore(storeId);
    
  } catch (err) {
    throw err;
  }
};
