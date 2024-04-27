const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const invoiceSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  currentDate: {
    type: String,
    required: true,
  },
  products: [productSchema],

  companyName: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
  companyEmail: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});
module.exports = mongoose.model("invoice", invoiceSchema);
