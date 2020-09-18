const mongoose = require('mongoose');
const { Schema } = mongoose;

const order = new Schema({

  
  products: [
    { 
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
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

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    required: true
  },

  stores: [
    {
      store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stores',
        require: true
      },
      
      isItReady: {
        type: Boolean,
        required: true,
        default: false
      } 
    }
  ],


  shipping: {

    address: {
      type: String,
      required: true
      // maxlength: 30, TODO:
      // minlength: 3 TODO: 
    },

    location: {
      lat: {
        type: Number,
        min: -90, 
        max: 90
      },
    
      long: {
        type: Number,
        min: -180,
        max: 180
      }
    },

    deliveryNotes: {
      type: String,
      // maxlength: 30, TODO:
      // minlength: 3 TODO: 
    },

    estimatedDelivery: {
      type: Date,
      required: true
    }

  },


  payment: {
    method:{
      type: String,
      enum: ["Visa", "Paypal"]
    },
    transactionId: String,
    trackingCode: String
  },

  driver: {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'drivers',
      required: false
    },
    acceptedDate: {
      type: Date,
      required: false
    },
    status: {
      type: String,
      enum: ['accepted', 'onWay', 'done', 'reject'],
      required: false
    }
  },


  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }


});

module.exports = mongoose.model('order', order, 'orders', { cache: false });
