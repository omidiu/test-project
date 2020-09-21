require('dotenv').config();
const { timeUtil } = require('../utils/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const MyError = require('../utils/error');
const randomString = require('randomstring');
const { customerRepository } = require('../repositories/index');

const productService = require('./product');
const orderService = require('./order');

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

/*********************************************************************************
* Edit item of shopping cart
**********************************************************************************/
exports.editItemOfShoppingCart = async (quantity, itemId, customerId) => {
  try {
    // Get customer
    const customer = await this.findById(customerId);

    // Find product id of item
    let productId;
    let indexOfItem;
    for (let index = 0; index < customer.shoppingCart.length; index++) {
      if ( JSON.stringify( customer.shoppingCart[index]._id ) === JSON.stringify(itemId) ){
        productId = customer.shoppingCart[index].productId;
        indexOfItem = index;
      }
    }
  
    // Means no item no product id
    if (!productId) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Not found"
      });
    }


    // Find product
    const product = await productService.findById(productId);
    

    // Check quantity of product
    if (quantity > product.quantity) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Not enough Products"
      });
    }


    // Edit item
    customer.shoppingCart[indexOfItem].quantity  = quantity;

    // save customer
    await customerRepository.save(customer);

    return 2;
    
    
    
  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Delete item of shopping cart
**********************************************************************************/
exports.deleteItemOfShoppingCart = async (itemId, customerId) => {
  try {
    // Get customer
    const customer = await this.findById(customerId);

    let isItemAvailable = false;

    // Search for item for delete
    for (let index = 0; index < customer.shoppingCart.length; index++) {
      if ( JSON.stringify( customer.shoppingCart[index]._id ) === JSON.stringify(itemId) ){
        customer.shoppingCart.splice(index, 1);
        isItemAvailable = true;
      }
    }
  
    // Means no item
    if (!isItemAvailable) {
      throw new MyError(404, "Bad request", new Error().stack, {
        message: "Not found"
      });
    }
    
    // save changes to database
    await customerRepository.save(customer);
    
    
  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Purchase
**********************************************************************************/
exports.purchase = async (address, location, estimatedDelivery, deliveryNotes, customerId) => {
  try {
    // Get customer
    const customer = await this.findById(customerId);

    // Get products ids
    const productsIds = customer.shoppingCart.map(item => { return item.productId });

    // Get products ids
    const products = await productService.findByIds(productsIds); 
    
    
    

    const UnAvailableProducts = [];

    // Check shopping cart is not empty
    if (customer.shoppingCart.length === 0) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "Your shopping cart is empty"
      });
    }

    // Check which products it's not available
    for (let index = 0; index < customer.shoppingCart.length; index++) {
      if (customer.shoppingCart[index].quantity > products[index].quantity) {
        UnAvailableProducts.push({
          productId: products[index]._id,
          available: products[index].quantity,
          yourOrder: customer.shoppingCart[index].quantity
        });
      }
    }

    // Check UnAvailable products
    if (UnAvailableProducts.length > 0) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "Can't purchase",
        UnAvailableProducts 
      })
    }

    // Decrease quantity of products
    for (let index = 0; index < products.length; index++) {
      await productService.decreaseQuantityOfProduct(-customer.shoppingCart[index].quantity, customer.shoppingCart[index].productId);
    }



    // Find stores of products 
    const storesIdsDup = products.map(product => { return product.storeId });


    // Remove duplicate store id
    const storesIds = storesIdsDup.splice(0, storesIdsDup.length, ...(new Set(storesIdsDup)));

    // Create stores with status
    const stores = storesIds.map( store => {
      return {
        storeId: store,
        isItReady: false
      }
    });

    // TODO:
    const payment = {
      method: "Visa",
      transactionId: randomString.generate({ length: 12, charset: 'hex' }),
      trackingCode: randomString.generate({ length: 12, charset: 'hex' })
    }
    
    // convert strings to js date obj
    const date = timeUtil.convertDateStringToDateObj(estimatedDelivery);

    const shipping = {
      address, 
      location, 
      estimatedDelivery: date, 
      deliveryNotes
    }
    
    const productsForOrder = customer.shoppingCart.map(item => {
      return {
        productId: item.productId,
        quantity: item.quantity
      }
    })
    
    await orderService.create( productsForOrder, shipping, stores, payment, customerId );
    
    // Make shopping cart to empty
    customer.shoppingCart = [];
    await customerRepository.save(customer);
    
    
    
  } catch (err) {
    throw err;
  }
};
