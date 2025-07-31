const adminMiddleware = (req, res, next) => {
    // Check if the user has admin role
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' }); // User is not admin
    }
};

module.exports = adminMiddleware;