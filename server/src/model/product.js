
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  rating: { type: Number, required: false }
});

const Product = mongoose.model("products", productSchema);
module.exports = Product