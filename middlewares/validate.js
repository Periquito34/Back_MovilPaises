// src/middlewares/validate.js
import { validationResult } from 'express-validator';

/**
 * Intercepta la petición después de ejecutar las validaciones declarativas
 * en la ruta (body, param, query…).  Si hay errores responde 400 con un
 * array de { field, message }, si no continua con next().
 *
 * Uso:
 *   router.post('/pais',
 *     body('name').notEmpty(),
 *     body('iso').isLength({min:2,max:2}),
 *     validate,               // <-- aquí
 *     controllerFn
 *   );
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();            // no hay errores → sigue el flujo normal
  }

  // Formateamos los errores para que el cliente los entienda
  const formatted = errors.array().map(err => ({
    field: err.param,
    message: err.msg
  }));

  return res.status(400).json({ errors: formatted });
};
