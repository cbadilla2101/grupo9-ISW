
const Correo = require('../models/Correo');

const createCorreo = async (req, res) => {
  try {
    const correo = new Correo({
      mantencion: req.body.mantencion,
      userEmails: req.body.userEmails,
      asunto: req.body.asunto,
      descripcion: req.body.descripcion
    });

    const nuevoCorreo = await correo.save();

    return res.status(201).json({
      message: 'Correos guardados correctamente',
      correos: nuevoCorreo
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const getCorreos = async (_req, res) => {
  try {
    const correos = await Correo.find()
      .populate('mantencion', { descripcion: 1 });

    return res.json(correos);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }

};

const getCorreoById = async (req, res) => {
  try {
    const correo = await Correo.findById(req.params.id)
      .populate('mantencion', { descripcion: 1 });

    if (!correo) {
      return res.status(404).json({
        message: 'El correo no exite'
      });
    }

    return res.json(correo);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const deleteCorreoById = async (req, res) => {
  try {
    const correoEliminado = await Correo.findByIdAndDelete(req.params.id);

    if (!correoEliminado) {
      return res.status(404).json({
        message: 'Correo no existe'
      });
    }

    return res.json({
      message: 'Correo eliminado correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getCorreos,
  createCorreo,
  getCorreoById,
  deleteCorreoById
}



