const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Profile Routes
router.get('/profile', authMiddleware, userController.getUserProfile);    // GET /api/users/profile
router.put('/profile', authMiddleware, userController.updateUserProfile); // PUT /api/users/profile

// Admin or Internal Routes (optional)
router.get('/', authMiddleware, userController.getAllUsers);        // GET /api/users/
router.get('/:id', authMiddleware, userController.getUserById);     // GET /api/users/:id
router.put('/:id', authMiddleware, userController.updateUser);      // PUT /api/users/:id
router.delete('/:id', authMiddleware, userController.deleteUser);   // DELETE /api/users/:id

module.exports = router;
