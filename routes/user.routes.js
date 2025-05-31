const express = require('express');

const {
  createAppUser,
  getAllAppUsers,
  updateAppUser,
  deleteAppUser,
} = require('../controllers/user.controller');

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/', createAppUser);

// Ruta para obtener todos los usuarios
router.get('/', getAllAppUsers);

// Ruta para actualizar un usuario por ID
router.put('/:id', updateAppUser);

// Ruta para eliminar un usuario por ID
router.delete('/:id', deleteAppUser);

module.exports = router;
