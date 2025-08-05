const express = require('express');
const router = express.Router();
const { getUserNotifications, createNotification } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getUserNotifications)
  .post(protect, createNotification);

module.exports = router;
