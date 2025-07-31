// This file manages order-related logic. 

const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { products } = req.body;

        // 1. Get product details from the database to ensure correct pricing
        const productIds = products.map(p => p.product);
        const productDetails = await Product.find({ '_id': { $in: productIds } });

        // 2. Calculate the total amount on the server to prevent tampering
        let totalAmount = 0;
        for (const item of products) {
            const product = productDetails.find(p => p._id.toString() === item.product);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.product} not found.` });
            }
            totalAmount += product.price * item.quantity;
        }

        // 3. Create the new order with the authenticated user's ID
        const newOrder = new Order({ ...req.body, user: req.user.id, totalAmount });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
    try {
        // Populate user and product details
        const order = await Order.findById(req.params.id)
            .populate('user', 'username email')
            .populate('products.product', 'name price');

        // Security Check: Ensure the user owns this order or is an admin
        if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        // Only get orders for the currently logged-in user
        const orders = await Order.find({ user: req.user.id }).populate('user', 'username email')
            .populate('products.product', 'name price');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};