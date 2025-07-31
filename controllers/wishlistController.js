const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// GET /api/wishlist - Get all wishlist items for a user
exports.getAllWishlistItems = async (req, res) => {
  try {
    const userId = req.user._id; // assuming user is authenticated and user data is available via middleware
    const wishlist = await Wishlist.findOne({ userId }).populate('products');
    
    if (!wishlist) {
      return res.status(200).json({ products: [] }); // Empty wishlist
    }

    res.status(200).json({ products: wishlist.products });
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching wishlist', error: err.message });
  }
};

// POST /api/wishlist - Add product to wishlist
exports.addItemToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else {
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to wishlist', error: err.message });
  }
};

// DELETE /api/wishlist/:id - Remove product from wishlist
exports.removeItemFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from wishlist', error: err.message });
  }
};
