const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinary = require('../config/cloudinaryConfig');


// ===============================
// Cloudinary Storage
// ===============================

const storage = new CloudinaryStorage({

    cloudinary,

    params: {
        folder: "InventoryFolder",

        allowed_formats: [
            "jpg",
            "png",
            "jpeg"
        ],

        transformation: [
            {
                width: 1000,
                crop: "limit"
            }
        ]
    }

});


// ===============================
// Multer Upload Middleware
// ===============================

const upload = multer({
    storage
});


module.exports = upload;

