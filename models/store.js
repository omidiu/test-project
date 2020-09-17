const mongoose = require('mongoose');
const { Schema } = mongoose;

const store = new Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    // maxlength: 30, TODO:
    // minlength: 3 TODO:
  },
  
  address: {
    type: String,
    required: true,
    trim: true,
    // maxlength: 30, TODO:
    // minlength: 3 TODO:
  },

  lat: {
    type: Number,
    min: -90, 
    max: 90,
    required: true
  },

  long: {
    type: Number,
    min: -180,
    max: 180,
    required: true
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'storeOwners',
    required: true
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    // required: true 
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }

  

  

});

module.exports = mongoose.model('store', store, 'stores', { cache: false });
