const mongoose = require('mongoose');
const { Schema } = mongoose;

const driver = new Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    // maxlength: 30, TODO:
    // minlength: 3 TODO:
  },

  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
    // maxlength: 30, TODO:
    // minlength: 3 TODO:
  },

  password: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    unique: true,
    // required: true
  },

  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },

  isVerified: {
    type: Boolean, 
    required: true,
    default: false
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },

  


});

module.exports = mongoose.model('driver', driver, 'drivers', { cache: false });
