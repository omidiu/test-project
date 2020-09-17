const MyError = require('../lib/error');
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
* Get all products of store
**********************************************************************************/
exports.GetAllProductOfStore = async ( storeId ) => {
  try {
    
    return await productRepository.GetAllProductOfStore(storeId);
    
  } catch (err) {
    throw err;
  }
};
