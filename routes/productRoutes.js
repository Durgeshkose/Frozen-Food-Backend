const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminAuth = require('../middlewares/adminAuthMiddleware');


router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', adminAuth, productController.createProduct);
router.put('/:id', adminAuth, productController.updateProduct);
router.delete('/:id', adminAuth, productController.deleteProduct);


module.exports = router;
