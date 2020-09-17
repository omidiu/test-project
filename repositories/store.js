const MyError = require('../lib/error');
const { Store } = require('../models/index');



/*********************************************************************************
* Find a store by id  
**********************************************************************************/
exports.findById = async (ownerId) => {
  try {

    return await Store.findById( ownerId );
    

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Find a store by owner id  
**********************************************************************************/
exports.findByOwner = async (ownerId) => {
  try {

    return await Store.findOne({ ownerId });
    

  } catch (err) {
    throw err
  }
};


/*********************************************************************************
* Create a store  
**********************************************************************************/
exports.create = async (name, address, lat, long, ownerId) => {
  try {
    console.log('*******');
    console.log(ownerId);
    console.log('*******');
    await Store.create({ name, address, lat, long, ownerId });

  } catch (err) {
    throw err
  }
};



/*********************************************************************************
* Find a store by owner id  
**********************************************************************************/
exports.findByOwner = async (ownerId) => {
  try {

    return await Store.findOne({ ownerId });
    

  } catch (err) {
    throw err
  }
};
