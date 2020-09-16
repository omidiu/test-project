const categoryController = require('./category');
const customerController = require('./customer');
const driverController = require('./driver');
const orderController = require('./order');
const productController = require('./product');
const storeOwnerController = require('./store-owner');
const storeController = require('./store');
const adminController = require('./admin');


module.exports = {
  categoryController,
  customerController,
  driverController,
  orderController,
  productController,
  storeOwnerController,
  storeController,
  adminController
}