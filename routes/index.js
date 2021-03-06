const categoryRouter = require('./category');
const customerRouter = require('./customer');
const driverRouter = require('./driver');
const orderRouter = require('./order');
const productRouter = require('./product');
const storeOwnerRouter = require('./store-owner');
const storeRouter = require('./store');
const adminRouter = require('./admin');

module.exports = {
  categoryRouter,
  customerRouter,
  driverRouter,
  orderRouter,
  productRouter,
  storeOwnerRouter,
  storeRouter,
  adminRouter
}