const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'failed'],
    default: 'pending'
  },
  deliveryStatus: {
    type: String,
    enum: ['delivered', 'in-transit', 'pending'],
    default: 'pending'
  },
  shippingLocation: {
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  }
});

// OPTIONAL: Only keep if shippingLocation will be a GeoJSON point with coords
// orderSchema.index({ shippingLocation: '2dsphere' });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
