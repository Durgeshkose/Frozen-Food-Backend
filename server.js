const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const blogRoutes = require('./routes/blogRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

// Middleware
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔐 CORS setup for localhost and Netlify frontend
app.use(cors({
  origin: [
    "https://frozenfood.netlify.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🌐 Test route to check frontend-backend connection
app.get('/api/test', (req, res) => {
  res.json({ msg: 'Backend is working ✅' });
});

// 🌐 API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/wishlist', wishlistRoutes);

// ❌ Error middleware (should be last)
app.use(errorMiddleware);

// 🚀 Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
