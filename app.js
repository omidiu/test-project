const MyError = require('./lib/error');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// require mongoose
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); // for deprecating warning
mongoose.set('debug', true);
// Connect to MongoDB
try {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () =>
    console.log('connected to database'));
} catch (error) {
  console.log('could not connect to database');
  console.log(error);
}

// Import routes
const { categoryRouter, customerRouter, driverRouter, orderRouter, productRouter, storeOwnerRouter, storeRouter, adminRouter } = require('./routes/index');

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/categories', categoryRouter);
app.use('/customers', customerRouter);
app.use('/drivers', driverRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);
app.use('/storeOwners', storeOwnerRouter);
app.use('/stores', storeRouter);
app.use('/admins', adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new MyError(404, "Not found", new Error().stack, {
    message: "Not found"
  }));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err.message);
  console.log(err.stack);
  
  res.status(err.status || 500);
  res.json({
    errObj:  err.obj || "Something went wrong"
  });
});

module.exports = app;
