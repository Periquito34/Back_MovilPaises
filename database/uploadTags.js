const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'tu_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'tu_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'tu_api_secret'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tags', 
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const uploadTags = multer({ storage });

module.exports = uploadTags;