const mongoose = require('mongoose');
const { Schema } = mongoose;

const product = new Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    // maxlength: 30, TODO:
    // minlength: 3 TODO:
  },
  
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stores',
    required: true
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    // required: true
  },

  

  price: {
    type: Number,
    min: 0 // which mean free :-| 
  },

  quantity: {
    type: Number, 
    min: 0
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }

});

module.exports = mongoose.model('product', product, 'products', { cache: false });
