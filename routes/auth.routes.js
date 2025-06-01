const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

// Ruta para iniciar sesión
router.post('/', login);

// Exporta el router para usarlo en la aplicación principal
module.exports = router;