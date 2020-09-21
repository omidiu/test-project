require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const MyError = require('../utils/error');
const { storeOwnerRepository } = require('../repositories/index');

// const { storeService } = require('./index');
const storeService = require('./store');
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

/*********************************************************************************
* Verify store owner
**********************************************************************************/
exports.verify = async (storeOwnerId) => {
  try {

    await storeOwnerRepository.verify(storeOwnerId);

  } catch (err) {
    throw err;
  }
}


/*********************************************************************************
* Create store 
**********************************************************************************/
exports.createStore = async ( name, address, lat, long, ownerId ) => {
  try {
    
    if (await storeService.findByOwner(ownerId) ) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "You already have a store"
      });
    }

    const createdStore = await storeService.create(name, address, lat, long, ownerId)

  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Create product 
**********************************************************************************/
exports.createProduct = async ( name, price, quantity, ownerId ) => {
  try {
    
    const store = await storeService.findByOwner(ownerId)
    if (!store) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "Please create a store first"
      });
    }
    
    const storeId = store._id;

    const createdProduct = await productService.create(name, price, quantity, storeId);
    return createdProduct;

  } catch (err) {
    throw err;
  }
};



/*********************************************************************************
* Get one product of store
**********************************************************************************/
exports.getProductOfStore = async ( ownerId, productId) => {
  try {
    
    const store = await storeService.findByOwner(ownerId)
    if (!store) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "You don't have any store yet"
      });
    }
    // Get store id of store owner
    const storeId = store._id;

    // Find product
    const product = await productService.findById(productId);

    // Check product for store or not (related to store owner too)
    if (product.storeId.toString() !== storeId.toString()){
      return {}
    }

    return product;
  } catch (err) {
    throw err;
  }
};




/*********************************************************************************
* Find order of store owner 
**********************************************************************************/
exports.findAllOrdersOfStoreOwner = async ( storeOwnerId) => {
  try {
    
    const store = await storeService.findByOwner(storeOwnerId);
    
    if (!store) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "You don't have any store yet. So there is no order for you :( "
      });
    }

    // Get store id of store owner
    const storeId = store._id;

 

    // Find order (after $lookup) 
    const ordersArray = await orderService.findAllOrdersOfStore(storeId);

    
    
    // products which belongs to store in order
    const ordersOfStore = [];
    
    for (let i = 0; i < ordersArray.length; i++) {
     
      // New order record
      ordersOfStore.push({
        orderId: ordersArray[i]._id, 
        products: []
      })

      // Push products which belongs to store
      for (let j = 0; j < ordersArray[i]["products"].length; j++) {
        if ( JSON.stringify (ordersArray[i]["products"][j].storeId[0]) === JSON.stringify(storeId)) {
          ordersOfStore[i].products.push( ordersArray[i]["products"][j].product )
        }
      }
      
      
      
    }
    

    
    return ordersOfStore;
    
    
  } catch (err) {
    throw err;
  }
};



/*********************************************************************************
* Find order of store owner 
**********************************************************************************/
exports.findOrderOfStoreOwner = async ( orderId, storeOwnerId) => {
  try {
    
    const store = await storeService.findByOwner(storeOwnerId);
    
    if (!store) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "You don't have any store yet. So there is no order for you :( "
      });
    }

    // Get store id of store owner
    const storeId = store._id;


    
    // Find order (after $lookup) 
    const orderArray = await orderService.findOrderOfStore(storeId, orderId);
    

    // products which belongs to store in order
    const orderOfStore = {
      orderId
    }


    

    const productsOfStore = [];
    
    for (let index = 0; index < orderArray.length; index++) {
      // Check if product belongs to store
      if ( JSON.stringify (orderArray[index]["productArray"][0].storeId) === JSON.stringify(storeId)) {
        productsOfStore.push({
          product: orderArray[index]["productArray"][0], // It can change later
          quantity: orderArray[index]["products"]["quantity"]
        });
      }
      
    }
    
    

    orderOfStore.products = productsOfStore

    // Check empty (if empty means it's not for this store) 
    if (productsOfStore.length === 0) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: 'Access denied'
      });
    }

    return orderOfStore;
    
  } catch (err) {
    throw err;
  }
};


/*********************************************************************************
* Mark order completed from store 
**********************************************************************************/
exports.markOrderReadyFromStore = async ( orderId, storeOwnerId) => {
  try {
    
    const store = await storeService.findByOwner(storeOwnerId);
    
    if (!store) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "You don't have any store yet. So there is no order for you :( "
      });
    }

    // Get store id of store owner
    const storeId = store._id;

    // Get order
    const order = await orderService.findById(orderId);
    
    if ( !order ) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "Order not found"
      });
    }

    // Get store ids of order
    const storesOfOrder = order.stores.map(store => { return store.storeId });

    // Check access of store (actually access of store owner by store id of him/her )
    if ( !storesOfOrder.includes(storeId) ) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "Access denied"
      });
    }

    await orderService.markOrderReadyFromStore(orderId, storeId);
    
    
  } catch (err) {
    throw err;
  }
};





/*********************************************************************************
* Get all products 
**********************************************************************************/
exports.getAllProductsOfStore = async ( ownerId ) => {
  try {
    
    const store = await storeService.findByOwner(ownerId)
    if (!store) {
      throw new MyError(400, "Bad request", new Error().stack, {
        message: "You don't have any store yet"
      });
    }

    const storeId = store._id;

    const products = await productService.getAllProductsOfStore(storeId);
    return products;
  } catch (err) {
    throw err;
  }
};



