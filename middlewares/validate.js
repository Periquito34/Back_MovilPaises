const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const validateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica que venga el header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o malformado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Adjunta los datos del token a la request
    req.user = decoded;

    next(); // pasa al siguiente middleware o controlador
  } catch (err) {
    console.error('JWT inválido o expirado:', err.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = validateJWT;
