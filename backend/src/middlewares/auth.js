const Usuario = require('../models/Usuario');
const fs = require('fs/promises');
const path = require("path");

function permit(...rolesPermitidos) {
  return async (req, res, next) => {
    try {
      const usuario = await Usuario.findById(req.body.usuarioId);
  
      if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
        if (req.files) {
          await fs.unlink(path.resolve(req.files.imagen_antes[0].path));
          await fs.unlink(path.resolve(req.files.imagen_despues[0].path));
        }
        console.log(path.resolve(''))
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