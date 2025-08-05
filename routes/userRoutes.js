const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');



// Profile Routes
router.get('/profile', protect, userController.getUserProfile);    // GET /api/users/profile
router.put('/profile', protect, userController.updateUserProfile); // PUT /api/users/profile

// Admin or Internal Routes (optional)
router.get('/', protect, userController.getAllUsers);        // GET /api/users/
router.get('/:id', protect, userController.getUserById);     // GET /api/users/:id
router.put('/:id', protect, userController.updateUser);      // PUT /api/users/:id
router.delete('/:id', protect, userController.deleteUser);   // DELETE /api/users/:id

module.exports = router;
