const mongoose = require('mongoose');
const { Schema } = mongoose;

const order = new Schema({

  
  products: [
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

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    required: true
  },

  status: [
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
      require: true
    },
    acceptedDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['accepted', 'onWay', 'done', 'reject'],
      default: "accepted"
    }
  },


  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }


});

module.exports = mongoose.model('order', order, 'orders', { cache: false });
