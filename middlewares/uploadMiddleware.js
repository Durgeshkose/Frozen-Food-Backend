const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // The name of the folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed file formats
  },
});

// Initialize multer with the Cloudinary storage
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload.single('file'); // 'file' is the name of the input field in the form