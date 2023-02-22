const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: { rate: Number, count: Number },
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = {
  CartModel,
};
