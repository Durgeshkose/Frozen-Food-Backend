const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

// Get user profile route (protected)
router.get('/profile', authMiddleware, authController.getProfile);

// Password reset route
router.post('/reset-password', authController.resetPassword);

// Export the router
module.exports = router;