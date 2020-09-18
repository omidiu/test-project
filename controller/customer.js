const { customerService } = require('../services/index');




/*********************************************************************************
* Create 
**********************************************************************************/
exports.create = async (req, res, next) => {
  try {
    // Get Customer information
    const { name, username, password, phoneNumber } = req.body;
    await customerService.register(name, username, password, phoneNumber);
    
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
    const token = await customerService.login(username, password); // return token
    
    return res.status(200).json({
      token
    })

  } catch (err) {
    next(err);
  }
};


/*********************************************************************************
* login
**********************************************************************************/
exports.getProfile = async (req, res, next) => {
  try {
    const customer = await customerService.getProfile(req.user);
    return res.send(customer);
  } catch (err) {
    next(err);
  }
};


/*********************************************************************************
* Edit profile
**********************************************************************************/
exports.editProfile = async (req, res, next) => {
  try {
    // Get Customer information
    const { name, username } = req.body;
    await customerService.editProfile(name, username, req.user._id);
    
    res.status(200).json({
      "message": "Your account edited successfully"
    });

  } catch (err) {
    next(err);
  }
};



/*********************************************************************************
* Add item to shopping cart (Shoppin cart is array of items)
**********************************************************************************/
exports.addItemToShoppingCart = async (req, res, next) => {
  try {
    // Get item information
    const { productId, quantity } = req.body;
    const customerId = req.user;
    await customerService.addItemToShoppingCart(productId, quantity, customerId);
    
    res.status(200).json({
      "message": "Product added to your shopping cart successfully"
    });

  } catch (err) {
    next(err);
  }
};

/*********************************************************************************
* Edit item of shopping cart
**********************************************************************************/
exports.editItemOfShoppingCart = async (req, res, next) => {
  try {
    // Get item information
    const { quantity } = req.body;
    const customerId = req.user;
    const itemId = req.params.itemId;

    await customerService.editItemOfShoppingCart(quantity, itemId, customerId);
    
    res.status(200).json({
      "message": "Product edited successfully"
    });

  } catch (err) {
    next(err);
  }
};


/*********************************************************************************
* Delete item of shopping cart
**********************************************************************************/
exports.deleteItemOfShoppingCart = async (req, res, next) => {
  try {
    const customerId = req.user;
    const itemId = req.params.itemId;
    await customerService.deleteItemOfShoppingCart(itemId, customerId);
    
    res.status(200).json({
      "message": "Product removed successfully from your shopping cart"
    });

  } catch (err) {
    next(err);
  }
};



/*********************************************************************************
* Get shopping cart
**********************************************************************************/
exports.getShoppingCart = async (req, res, next) => {
  try {
    // Get item information
    const customerId = req.user;
    const shoppingCart = await customerService.getShoppingCart(customerId);
    
    res.status(200).json({
      shoppingCart
    });

  } catch (err) {
    next(err);
  }
};



/*********************************************************************************
* Purchase
**********************************************************************************/
exports.purchase = async (req, res, next) => {
  try {
    // Get order shipping information
    const { address, location, estimatedDelivery, deliveryNotes } = req.body;
    
    const customerId = req.user;
    await customerService.purchase(address, location, estimatedDelivery, deliveryNotes, customerId);
    
    res.status(200).json({
      "message": "Purchase completed successfully",
    });

  } catch (err) {
    next(err);
  }
};

