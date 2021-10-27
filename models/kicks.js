const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kicksSchema = Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  purchased: Boolean,

  public: Boolean,
});

const Kicks = mongoose.model("Kicks", kicksSchema);

module.exports = Kicks;