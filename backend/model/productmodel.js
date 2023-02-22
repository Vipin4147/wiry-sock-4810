const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: { rate: Number, count: Number },
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = {
  ProductModel,
};
