require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const MyError = require('../lib/error');
const { storeOwnerRepository } = require('../repositories/index');

/*********************************************************************************
* Create 
**********************************************************************************/
exports.register = async ( name, username, password, phoneNumber ) => {
  try {
    
    // Check there is no account with this phone number
    if (await this.findByPhoneNumber(phoneNumber)) {
      throw new MyError(400, "There is an account with this phone number", new Error().stack, {
        message: "There is an account with this phone number"
      });
    }

    // Check there is no account with this username
    if (await this.findByUsername(username)) {
      throw new MyError(400, "There is an account with this phone number", new Error().stack, {
        message: "There is an account with this username"
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await storeOwnerRepository.create(name, username, hashedPassword, phoneNumber);

    return true;


  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* login
**********************************************************************************/
exports.login = async (username, password) => {
  try {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "There is no account with this username"
      });
    }

    // Check password
    if (! await bcrypt.compare(password, user.password) ) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "Password is not correct"
      });
    }

    // Create and assign a token
    const token = jwt.sign({ 
      _id: user._id,
      role: 'storeOwner'
    }, process.env.TOKEN_SECRET);

    
    return token;

  } catch (err) {
    throw err;
  }
}


/*********************************************************************************
* Find by phone number
**********************************************************************************/
exports.findByPhoneNumber = async (phoneNumber) => {
  return await storeOwnerRepository.findByPhoneNumber(phoneNumber);
}


/*********************************************************************************
* Find by user name
**********************************************************************************/
exports.findByUsername = async (username) => {
  return await storeOwnerRepository.findByUsername(username);
}


/*********************************************************************************
* Find store owner by id 
**********************************************************************************/
exports.findById = async (storeOwnerId) => {
  try {
    const storeOwner = await storeOwnerRepository.findById(storeOwnerId);
    return storeOwner;
  } catch(err) {
    throw err;
  }
}