const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

//Bring In Middleware
const { protect} = require('../middleware/authMiddleware');
const { authorizeRoles} = require('../middleware/roleMiddleware');
const { route } = require('./userRoutes');

router.use(protect)

// ! No authentication here (as requested)
router.post('/products', authorizeRoles('admin'), productController.createProduct);
router.get('/products', authorizeRoles('salesperson'), productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;