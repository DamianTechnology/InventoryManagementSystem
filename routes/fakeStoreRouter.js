const fakeStoreController = require('../controller/fakeStoreController');
const express = require('express');
const fakeStoreRouter = express.Router();

fakeStoreRouter.get('/products', fakeStoreController.getProducts);
fakeStoreRouter.get('/products/:id', fakeStoreController.getProductById);
fakeStoreRouter.post('/products', fakeStoreController.createProduct);

module.exports = fakeStoreRouter;