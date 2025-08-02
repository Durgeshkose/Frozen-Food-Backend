// serversite/controllers/orderController.js

// --- JAASOOS (SPY) #1 ---
console.log("--- Reading orderController.js file now... ---");

const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
    // ... (function ka code waisa hi hai)
    try {
        const { orderItems, shippingAddress, paymentMethod, subTotal, deliveryFee, totalPrice } = req.body;
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items found' });
        }
        const itemsToSave = orderItems.map(item => ({ name: item.name, quantity: item.quantity, image: item.image, price: item.price, product: item._id }));
        const order = new Order({ user: req.user.id, orderItems: itemsToSave, shippingAddress, paymentMethod, subTotal, deliveryFee, totalPrice });
        const createdOrder = await order.save();
        for (const item of order.orderItems) {
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getMyOrders = async (req, res) => { /* ... code ... */ 
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
const getOrderById = async (req, res) => { /* ... code ... */ 
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (order) {
            if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to view this order' });
            }
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
const updateOrderStatus = async (req, res) => { /* ... code ... */ 
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.orderStatus = req.body.status || order.orderStatus;
            if (req.body.status === 'Delivered') {
                order.deliveredAt = Date.now();
            }
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
const getAllOrders = async (req, res) => { /* ... code ... */ 
    try {
        const orders = await Order.find({}).populate('user', 'id name').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const functionsToExport = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders
};

// --- JAASOOS (SPY) #2 ---
console.log("--- Exporting from orderController.js. Is createOrder a function? ---", typeof functionsToExport.createOrder);

module.exports = functionsToExport;
