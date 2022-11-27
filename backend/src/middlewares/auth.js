const Usuario = require('../models/Usuario');

function permit(...rolesPermitidos) {
  return async (req, res, next) => {
    try {
      const usuario = await Usuario.findById(req.body.usuarioId);
  
      if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
        return res.status(403).json({
          message: 'Acceso denegado'
        });
      }
      
      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}

module.exports = permit;