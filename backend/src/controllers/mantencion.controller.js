const Mantencion = require('../models/Mantencion');
const fs = require('fs/promises');
const path = require("path");

const createMantencion = async (req, res) => {
  try {
    const nuevaMantencion = await Mantencion.create({
      descripcion: req.body.descripcion,
      instalacion: req.body.instalacion,
      fecha_inicio: req.body.fecha_inicio,
      fecha_termino: req.body.fecha_termino,
      imagen_antes: req.files.imagen_antes[0].path,
      imagen_despues: req.files.imagen_despues[0].path,
      empresa: req.body.empresa,
      costo: req.body.costo,
      rutinaria: req.body.rutinaria,
      estado: req.body.estado
    });

    return res.status(201).json({
      message: 'Mantencion guardada correctamente',
      mantencion: nuevaMantencion
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const getMantenciones = async (_req, res) => {
  try {
    const mantenciones = await Mantencion.find();

    return res.json(mantenciones);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const getMantencionById = async (req, res) => {
  try {
    const mantencion = await Mantencion.findById(req.params.id);

    if (!mantencion) {
      return res.status(404).json({
        message: 'Mantencion no existe'
      });
    }
  
    return res.json(mantencion);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const updateMantencionById = async (req, res) => {
  try {
    const mantencionActualizada = await Mantencion.findByIdAndUpdate(req.params.id, {
      descripcion: req.body.descripcion,
      instalacion: req.body.instalacion,
      fecha_inicio: req.body.fecha_inicio,
      fecha_termino: req.body.fecha_termino,
      imagen_antes: req.files.imagen_antes[0].path,
      imagen_despues: req.files.imagen_despues[0].path,
      empresa: req.body.empresa,
      costo: req.body.costo,
      rutinaria: req.body.rutinaria,
      estado: req.body.estado
    }, {
      new: true
    });

    if (!mantencionActualizada) {
      return res.status(404).json({
        message: 'Mantencion no existe'
      });
    }
  
    return res.json({
      message: 'Mantencion actualizado correctamente',
      mantencion: mantencionActualizada
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const deleteMantencionById = async (req, res) => {
  try {
      const mantencionEliminada = await Mantencion.findByIdAndDelete(req.params.id);

    if (!mantencionEliminada) {
      return res.status(404).json({
        message: 'Mantencion no existe'
      });
    }

    await fs.unlink(path.resolve(mantencionEliminada.imagen_antes));
    await fs.unlink(path.resolve(mantencionEliminada.imagen_despues));
  
    return res.json({
      message: 'Mantencion eliminada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
    createMantencion,
    getMantenciones,
    getMantencionById,
    updateMantencionById,
    deleteMantencionById
}