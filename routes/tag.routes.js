const express = require('express');
const {
  createTag,
  getAllTags,
  updateTag,
  deleteTag,
} = require('../controllers/tag.controller');

const router = express.Router();
const uploadTags = require('../database/uploadTags'); // Importar el middleware de multer

router.post('/', uploadTags.single('foto'), createTag); // Usar el middleware para manejar la subida de archivos
router.get('/', getAllTags);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

module.exports = router;
