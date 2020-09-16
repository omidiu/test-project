const categoryRepository = require('./category');
const customerRepository = require('./customer');
const driverRepository = require('./driver');
const orderRepository = require('./order');
const productRepository = require('./product');
const storeOwnerRepository = require('./store-owner');
const storeRepository = require('./store');



module.exports = {
  categoryRepository,
  customerRepository,
  driverRepository,
  orderRepository,
  productRepository,
  storeOwnerRepository,
  storeRepository
}