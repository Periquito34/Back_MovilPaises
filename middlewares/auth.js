import jwt from 'jsonwebtoken';

/**
 * Protege rutas.  Si pasas ['ADMIN'] solo deja entrar a admins.
 */
export const requireAuth = (roles = []) => (req, res, next) => {
  const bearer = req.headers.authorization?.split(' ')[1];
  if (!bearer) return res.sendStatus(401);

  try {
    const payload = jwt.verify(bearer, process.env.JWT_SECRET);
    // roles opcionales
    if (roles.length && !roles.includes(payload.role)) return res.sendStatus(403);

    req.user = payload; // { uid, role, iat, exp }
    next();
  } catch {
    return res.status(401).json({ msg: 'Token expirado o inválido' });
  }
};
