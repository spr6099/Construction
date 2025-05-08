const mongoose = require("mongoose");

const supplierProduct = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  name: { type: String },
  category: { type: String },
  price: { type: String },
  unit: { type: String },
  description: { type: String },
  productimage: { type: String },
});

module.exports = mongoose.model("products", supplierProduct);
