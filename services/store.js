const MyError = require('../lib/error');
const { storeRepository } = require('../repositories/index');


/*********************************************************************************
* Find store by id 
**********************************************************************************/
exports.findById = async ( storeId ) => {
  try {
    
    const store = await storeRepository.findById(ownerId);
    return store;
    
  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Find store by owner id 
**********************************************************************************/
exports.findByOwner = async ( ownerId ) => {
  try {
    
    const store = await storeRepository.findByOwner(ownerId);
    return store;
    
  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Create store
**********************************************************************************/
exports.create = async ( name, address, lat, long, ownerId ) => {
  try {
    
    await storeRepository.create(name, address, lat, long, ownerId);
    
  } catch (err) {
    throw err;
  }
};