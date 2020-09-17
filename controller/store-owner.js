const { storeOwnerService } = require('../services/index');





/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async (req, res, next) => {
  try {
    // Get Customer information
    const { name, username, password, phoneNumber } = req.body;
    await storeOwnerService.register(name, username, password, phoneNumber);
    
    res.status(200).json({
      "message": "Your account created successfully"
    });

  } catch (err) {
    next(err);
  }
};


/*********************************************************************************
* login
**********************************************************************************/
exports.login = async (req, res, next) => {
  try {

    // Get Customer login info
    const { username, password } = req.body;
    const token = await storeOwnerService.login(username, password); // return token
    
    return res.status(200).json({
      token
    })

  } catch (err) {
    next(err);
  }
};



/*********************************************************************************
* Create store 
**********************************************************************************/
exports.createStore = async (req, res, next) => {
  try {
    const {name, address, lat, long} = req.body;
    const ownerId = req.user;
    await storeOwnerService.createStore(name, address, lat, long, ownerId);
    
    res.status(200).json({
      "message": "Your store created successfully"
    });

  } catch (err) {
    next(err);
  }
};




/*********************************************************************************
* Create product 
**********************************************************************************/
exports.addProduct = async (req, res, next) => {
  try {
    const {name, price, quantity} = req.body;
    const ownerId = req.user;
    const product = await storeOwnerService.createProduct(name, price, quantity, ownerId);
    
    res.status(200).json({
      "message": "Your product created successfully",
      product
    });

  } catch (err) {
    next(err);
  }
};


/*********************************************************************************
* Get one product of store 
**********************************************************************************/
exports.getProductOfStore = async (req, res, next) => {
  try {
    const ownerId = req.user;
    const productId = req.params.productId;
    const product = await storeOwnerService.getProductOfStore(ownerId, productId);
    

    
    res.status(200).json({
      product
    });

  } catch (err) {
    next(err);
  }
};




/*********************************************************************************
* Get all products of store 
**********************************************************************************/
exports.getAllProductsOfStore = async (req, res, next) => {
  try {
    const ownerId = req.user
    const products = await storeOwnerService.getAllProductsOfStore(ownerId);
    

    
    res.status(200).json({
      products
    });

  } catch (err) {
    next(err);
  }
};

