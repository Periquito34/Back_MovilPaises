const express = require('express');
const {
  createCity,
  getAllCities,
  updateCity,
  deleteCity,
} = require('../controllers/ciudad.controller');

const router = express.Router();

// Crear ciudad
router.post('/', createCity);

// Obtener todas las ciudades
router.get('/', getAllCities);

// Actualizar ciudad por id
router.put('/:id', updateCity);

// Eliminar ciudad por id
router.delete('/:id', deleteCity);

module.exports = router;
