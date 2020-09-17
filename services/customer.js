require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const MyError = require('../lib/error');
const { customerRepository } = require('../repositories/index');

const productService = require('./product');

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

    await customerRepository.create(name, username, hashedPassword, phoneNumber);

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
      role: 'customer'
    }, process.env.TOKEN_SECRET);

    
    return token;

  } catch (err) {
    throw err;
  }
}


/*********************************************************************************
* Edit profile 
**********************************************************************************/
exports.editProfile = async ( name, username, customerId) => {
  try {
    

    let user = await this.findByUsername(username)
    if (user) {
      // Check if username is not exist  ( not for him/her :( )
      if (customerId.toString() !== user._id.toString())
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "There is an account with this username"
      });
    }

    

    await customerRepository.updateProfile(name, username, customerId);

    return true;


  } catch (err) {
    throw err;
  }
};




/*********************************************************************************
* Find by phone number
**********************************************************************************/
exports.findByPhoneNumber = async (phoneNumber) => {
  return await customerRepository.findByPhoneNumber(phoneNumber);
}


/*********************************************************************************
* Find by user name
**********************************************************************************/
exports.findByUsername = async (username) => {
  return await customerRepository.findByUsername(username);
}


/*********************************************************************************
* Find customer by id
**********************************************************************************/
exports.findById = async ( customerId ) => {
  try {
    
    const customer = await customerRepository.findById(customerId);
    return customer

  } catch (err) {
    throw err;
  }
};



/*********************************************************************************
* Get profile
**********************************************************************************/
exports.getProfile = async (customerId) => {
  try {
    // Get customer
    const customer = await this.findById(customerId);

    // Cast to object
    const customerObj = customer.toObject();

    // Delete password & Shopping cart
    delete customerObj.password;
    delete customerObj.shoppingCart;
    
    return customerObj;

  } catch (err) {
    throw err;
  }
};

/*********************************************************************************
* Get shopping cart
**********************************************************************************/
exports.getShoppingCart = async (customerId) => {
  try {
    // Get customer
    const customer = await this.findById(customerId);

    // Cast to object
    const customerObj = customer.toObject();


    return customerObj.shoppingCart;

  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Add item to shopping cart (Shopping cart is array of items)
**********************************************************************************/
exports.addItemToShoppingCart = async (productId, quantity, customerId) => {
  try {
    // Get 
    const product = await productService.findById(productId);
    if (!product) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Product not found"
      });
    }
    
    // Check quantity of product
    if (quantity > product.quantity) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Not enough Products"
      });
    }
    
    // Get shopping cart
    const shoppingCart = await this.getShoppingCart(customerId);

    // Check shopping cart contains that product (It should be delete)
    for (let item = 0; item < shoppingCart.length; item++) {
      if ( JSON.stringify( shoppingCart[item].productId ) === JSON.stringify(productId) ){
        await customerRepository.deleteItemFromShoppingCart(shoppingCart[item]._id, customerId);
      }
    }
    
    await customerRepository.pushItemToShoppingCart(productId, quantity, customerId);
    
    
  } catch (err) {
    throw err;
  }
};



