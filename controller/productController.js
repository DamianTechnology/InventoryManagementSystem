const Product = require('../models/productModel');
const User = require('../models/userModel');
// const cloudinary = require('../middleware/cloudinary');
const cloudinary = require('../config/cloudinaryConfig');
const sendEmail = require('../middleware/emailSender');
const fs = require('fs');
const path = require('path');



// ===============================
// Update Product Image
// ===============================
exports.updateProductImage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Delete old image from Cloudinary
        if (product.imageUrl) {
            const publicId = product.imageUrl.split("/").pop().split(".")[0];

            await cloudinary.uploader.destroy(`InventoryFolder/${publicId}`);
        }

        // Save new image
        product.imageUrl = req.file.path;

        await product.save();

        res.status(200).json({
            message: "Image updated successfully",
            product,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// ===============================
// Create Product
// ===============================
// exports.createProduct = async (req, res) => {
//     try {
//         const { name, price } = req.body;

        // Create product
        // const product = new Product({
        //     name,
        //     price
        // });

        // await product.save();


console.log("CREATE PRODUCT CONTROLLER LOADED");
exports.createProduct = async (req, res) => {
     console.log("CREATE PRODUCT WAS CALLED");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

     try { const { name, price, quantity } = req.body;

      // Get uploaded image URL from Cloudinary 
      const imageUrl = req.file ? req.file.path : undefined;

      // Create product
       const product = await Product.create({ name, price, quantity, imageUrl });


        // ===============================
        // Get all admins
        // ===============================
        const admins = await User.find({
            role: "admin"
        });

        const adminEmails = admins.map(admin => admin.email);


        // ===============================
        // Email notification
        // ===============================
        const subject = "New Product Created";

       const templatePath = path.join(
    __dirname,
    '../htmlTemplates/productMail.html'
);

let message = fs.readFileSync(
    templatePath,
    'utf8'
);
// Replace HTML placeholders

 message = message
 .replace( '{{PRODUCT_NAME}}', product.name ) 
 .replace( '{{PRODUCT_PRICE}}', product.price );


        // Send email if admins exist
        if (adminEmails.length > 0) {
            await sendEmail(
                adminEmails,
                subject,
            message
            );
        }


        // ===============================
        // Response
        // ===============================
        res.status(201).json({
            success: true,
            message: "Product created and admins notified",
            product
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};



// ===============================
// Get All Products
// ===============================
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// ===============================
// Get One Product
// ===============================
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// ===============================
// Update Product
// ===============================
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after' }
        );

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// ===============================
// Delete Product
// ===============================
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json({
            message: 'Product deleted'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
