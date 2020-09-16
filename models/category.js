const mongoose = require('mongoose');
const { Schema } = mongoose;

const category = new Schema({

  title: {
    type: String,
    required: true,
    trim: true,
    // maxlength: 30, TODO:
    // minlength: 3 TODO:
  },
  
  description: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stores',
    required: true
  },

  path: {
    type: String, // TODO: may be implement with parent or child :(
    required: true
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },

  price: {
    type: Number,
    min: 0 // which mean free :-| 
  },

  quantity: {
    type: Number, 
    min: 0
  }


});

module.exports = mongoose.model('category', category, 'categories', { cache: false });
