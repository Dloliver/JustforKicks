const mongoose = require('mongoose');

const kicksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  purchase: Boolean
});

const Kicks = mongoose.model('Kicks', kicksSchema);

module.exports = Kicks;