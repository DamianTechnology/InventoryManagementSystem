const axios = require('axios');

const baseURL = 'https://fakestoreapi.com';

const apiClient = axios.create({
  baseURL,
  timeout: 5000, // Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

//get all products
exports.getProducts = async function () {
  try {
    const response = await apiClient.get('/products');  
    return response.data;
  } catch (err) {
    console.log('Error fetching products:', err);
    throw err;
  }
};

//get product by id
exports.getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);    
    return response.data;
  } catch (err) {
    console.log('Error fetching product by ID:', err);
    throw err;
  }
};

//create a new product
exports.createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/products', productData);            
    return response.data;
  } catch (err) {
    console.log('Error creating product:', err);
    throw err;
  }
};