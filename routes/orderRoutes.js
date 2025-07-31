const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to create a new order
router.post('/', authMiddleware, orderController.createOrder);

// Route to get all orders
router.get('/', authMiddleware, orderController.getAllOrders);

// Route to get a specific order by ID
router.get('/:id', authMiddleware, orderController.getOrderById);

// Route to update an order by ID
router.put('/:id', authMiddleware, orderController.updateOrder);

// Route to delete an order by ID
router.delete('/:id', authMiddleware, orderController.deleteOrder);

module.exports = router;