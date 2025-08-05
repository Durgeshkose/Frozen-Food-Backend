const Notification = require('../models/Notification');

// GET /api/notifications - get all user notifications
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications', error });
  }
};

// POST /api/notifications - create new notification
const createNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const newNotification = new Notification({ message, user: req.user.id });
    const saved = await newNotification.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notification', error });
  }
};

module.exports = {
  getUserNotifications,
  createNotification
};
