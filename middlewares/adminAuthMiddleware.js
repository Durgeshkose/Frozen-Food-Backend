const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuthMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, token missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized, admin not found' });
        }
        req.user = { id: admin._id, role: admin.role, email: admin.email };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token verification failed' });
    }
};

module.exports = adminAuthMiddleware;