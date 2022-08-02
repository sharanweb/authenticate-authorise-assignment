
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    rel: "users ",
    required: true,
  },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product