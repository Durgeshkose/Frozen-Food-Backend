const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: { // This links back to the original product
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
    }],
    shippingAddress: {
        // Aap future mein yahan address fields add kar sakte hain
        address: { type: String, default: 'N/A' },
        city: { type: String, default: 'N/A' },
    },
    paymentMethod: {
        type: String,
        required: true,
        default: 'Cash on Delivery'
    },
    subTotal: {
        type: Number,
        required: true,
        default: 0.0
    },
    deliveryFee: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Pending',
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled']
    },
    deliveredAt: {
        type: Date
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Order', orderSchema);
