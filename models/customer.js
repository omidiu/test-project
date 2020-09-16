const mongoose = require('mongoose');
const { Schema } = mongoose;

const customer = new Schema({

  
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

  phoneNumber: {
    type: Number // TODO:
  },


  shoppingCart: [
    { 
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        require: true
      },
      
      quantity: {
        type: Number,
        required: true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
      } 
    }
  ],

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }


});

module.exports = mongoose.model('customer', customer, 'customers', { cache: false });
