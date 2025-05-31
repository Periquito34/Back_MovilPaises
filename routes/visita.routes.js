const express = require('express');
const router = express.Router();
const {
  createVisita,
  getAllVisitas,
  updateVisita,
  deleteVisita,
} = require('../controllers/visita.controller');

// Crear visita
router.post('/', createVisita);

// Obtener todas las visitas
router.get('/', getAllVisitas);

// Actualizar visita
router.put('/:id', updateVisita);

// Eliminar visita
router.delete('/:id', deleteVisita);

module.exports = router;
