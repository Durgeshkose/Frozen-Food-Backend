const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Route to get all items in the wishlist
router.get('/', wishlistController.getAllWishlistItems);

// Route to add an item to the wishlist
router.post('/', wishlistController.addItemToWishlist);

// Route to remove an item from the wishlist
router.delete('/:id', wishlistController.removeItemFromWishlist);

module.exports = router;