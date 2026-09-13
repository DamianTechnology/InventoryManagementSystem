const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const upload = require('../middleware/cloudinary');

//Bring In Middleware
const { protect} = require('../middleware/authMiddleware');
const { authorizeRoles} = require('../middleware/roleMiddleware');
// const { route } = require('./userRoutes');

router.use(protect)

// ! No authentication here (as requested)

router.post(
    '/products',
    authorizeRoles('admin'),
    upload.single('image'),productController.createProduct
);


router.get('/products', authorizeRoles('salesperson'), productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.patch('/products/:id/image', upload.single('image'), productController.updateProductImage
);
// router.post('/createProduct', productController.createProduct);

module.exports = router;
