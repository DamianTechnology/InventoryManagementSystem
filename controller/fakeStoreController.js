const apiAdapter = require('../config/fakeStoreAdapter');

//create a new product
exports.createProduct = async (req, res) => {
    const { title, price, description, image, category } = req.body;
    if (!title || !price || !description || !image || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newProduct = await apiAdapter.createProduct(req, res);
    res.status(201).json(newProduct);
};

//get all products
exports.getProducts = async (req, res) => {
    const products = await apiAdapter.getProducts(req, res);
    res.json(products);
};

//get product by id
exports.getProductById = async (req, res) => 
    {
        const product = await apiAdapter.getProductById(req, res);
        res.json(product);
};

