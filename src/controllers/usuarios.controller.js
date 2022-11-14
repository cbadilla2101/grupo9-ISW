const Usuario = require('../models/Usuario');

const createUsuario = async (req, res) => {
  try {
    const usuario = new Usuario({
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
      rol: req.body.rol
    });

    const nuevaUsuario = await usuario.save();
  
    return res.status(201).json({
      message: 'Usuario guardado correctamente',
      usuario: nuevaUsuario
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();

    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        message: 'Usuario no exite'
      });
    }
  
    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const updateUsuarioById = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, {
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
      rol: req.body.rol
    }, {
      new: true
    });

    if (!usuarioActualizado) {
      return res.status(404).json({
        message: 'Usuario no existe'
      });
    }
  
    return res.json({
      message: 'Usuario actualizado correctamente',
      usuario: usuarioActualizado
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const deleteUsuarioById = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuarioEliminado) {
      return res.status(404).json({
        message: 'Usuario no existe'
      });
    }
  
    return res.json({
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuarioById,
  deleteUsuarioById
}