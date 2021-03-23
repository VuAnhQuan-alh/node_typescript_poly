import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxLength: 60,
    required: true
  },
  description: {
    type: String,
    maxLength: 2000,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  picture: {
    data: Buffer,
    contentType: String,
  },
  quantity: {
    type: Number,
    required: true
  },
  shipping: {
    type: Boolean,
    required: true
  },
  sold: {
    type: Number,
    default: 0
  }
}, { timeStamps: true });

module.exports = mongoose.model("Product", productSchema);