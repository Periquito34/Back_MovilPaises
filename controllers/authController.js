const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {AppUser} = require('../models/user.model');

const SECRET_KEY = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    console.log('AppUser:', typeof AppUser, AppUser);

    // Buscar usuario por email
    const user = await AppUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Correo no registrado' });
    }

    // Verificar contraseña
    const isMatch = (password === user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Crear payload para el token
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '1h'
    });

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  login,
};
