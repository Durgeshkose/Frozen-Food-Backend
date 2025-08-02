const express = require('express');
const router = express.Router();

// Controller ko import karein
const orderController = require('../controllers/orderController');

// Middlewares ko import karein
const { protect, admin } = require('../middlewares/authMiddleware');

// =================================================================
// =========== YEH SABSE ZAROORI BADLAV HAI ========================
// Hum ab functions ko direct 'orderController' object se call karenge.
// Isse koi bhi variable conflict ka chance nahi rahega.
// =================================================================

// Route to create a new order
router.post('/', protect, orderController.createOrder);

// Route for a logged-in user to get their own orders
router.get('/myorders', protect, orderController.getMyOrders);

// Route for an admin to get all orders from all users
router.get('/', protect, admin, orderController.getAllOrders);

// Route to get a specific order by ID
router.get('/:id', protect, orderController.getOrderById);

// Route for an admin to update an order's status
router.put('/:id/status', protect, admin, orderController.updateOrderStatus);


module.exports = router;
