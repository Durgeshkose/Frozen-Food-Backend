const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
}, {
  // Automatically adds createdAt and updatedAt fields
  timestamps: true,
});

// Humne yahan se pre-save hook hata diya hai.
// Ab inStock ki value wahi hogi jo frontend se aayegi.

module.exports = mongoose.model('Product', productSchema);
