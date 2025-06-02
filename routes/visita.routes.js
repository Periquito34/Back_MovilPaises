const express = require('express');
const router = express.Router();
const {
  createVisita,
  getAllVisitas,
  updateVisita,
  deleteVisita,
  getVisitasByUser
} = require('../controllers/visita.controller');

const upload = require('../database/upload'); // <-- Importas la config de multer+cloudinary

// Crear visita (con imagen)
router.post('/', upload.single('foto'), createVisita);

// Obtener todas las visitas
router.get('/', getAllVisitas);

// Actualizar visita
router.put('/:id', updateVisita);

// Eliminar visita
router.delete('/:id', deleteVisita);

router.get('/user/:userId', getVisitasByUser);

module.exports = router;
