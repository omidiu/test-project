const mongoose = require('mongoose');
const { Schema } = mongoose;

const admin = new Schema({

  

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

  
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }


});

module.exports = mongoose.model('admin', admin, 'admins', { cache: false });
