const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware'); // <-- Add this line

// Use both middlewares for admin-protected routes
router.get('/users', adminAuthMiddleware, adminMiddleware, adminController.getAllUsers);
router.delete('/users/:id', adminAuthMiddleware, adminMiddleware, adminController.deleteUser);
router.get('/products', adminAuthMiddleware, adminMiddleware, adminController.getAllProducts);
router.post('/products', adminAuthMiddleware, adminMiddleware, adminController.createProduct);
router.put('/products/:id', adminAuthMiddleware, adminMiddleware, adminController.updateProduct);
router.delete('/products/:id', adminAuthMiddleware, adminMiddleware, adminController.deleteProduct);
router.get('/orders', adminAuthMiddleware, adminMiddleware, adminController.getAllOrders);
router.put('/orders/:id/status', adminAuthMiddleware, adminMiddleware, adminController.updateOrderStatus);


router.post('/login', adminController.loginAdmin);

module.exports = router;