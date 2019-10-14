const {mongoose} = require('../config/db')

var admins = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    brand: {
      type: String,
      trim: true,
      required: true
    },
    image: {
      type: String,
      trim: true,
      required: true
    },
    price: {
      type: Number,
      trim: true,
      required: true
    },
    descr: {
      type: String,
      trim: true,
      required: true
    },
    color: {
      type: String,
      trim: true,
      required: true
    },
    featured: {
      type: Boolean,
      trim: true,
      required: true
    },
    date: {
      type: Date,
      trim: true,
      required: true
    }
  })
  
  var Admins = mongoose.model('admins', admins)

  module.exports = {Admins}