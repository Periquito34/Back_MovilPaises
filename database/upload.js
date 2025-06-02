const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;  // Importar directamente de la biblioteca

// Configurar cloudinary con tus credenciales
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'tu_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'tu_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'tu_api_secret'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'visitas', // Carpeta en tu Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

module.exports = upload;