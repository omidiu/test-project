const MyError = require('../lib/error');
const { Admin } = require('../models/index');



/*********************************************************************************
* Find by id
**********************************************************************************/
exports.findById = async ( _id ) => {
  try {
    return await Admin.findById({ _id });
  } catch (err) {
    throw err
  }
};



/*********************************************************************************
* Find by username
**********************************************************************************/
exports.findByUsername = async ( username ) => {
  try {
    return await Admin.findOne({ username });
  } catch(err) {
    throw err
  }
  
};

