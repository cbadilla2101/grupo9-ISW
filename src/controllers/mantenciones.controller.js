const Mantencion = require('../models/Mantencion');

const createMantencion = async (req, res) => {
  try {
    const mantencion = new Mantencion({
      descripcion: req.body.descripcion,
      categoria: req.body.categoria,
      fecha_inicio: req.body.fecha_inicio,
      fecha_termino: req.body.fecha_termino,
      imagen_antes: req.files.imagen_antes[0].path,
      imagen_despues: req.files.imagen_despues[0].path,
      empresa: req.body.empresa,
      costo: req.body.costo,
      estado: req.body.estado
    });

    const nuevaMantencion = await mantencion.save();
  
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

const getMantenciones = async (req, res) => {
  try {
    const mantenciones = await Mantencion.find()
      .populate('categoria', { nombre: 1 });

    return res.json(mantenciones);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const getMantencionById = async (req, res) => {
  try {
    const mantencion = await Mantencion.findById(req.params.id)
      .populate('categoria', { nombre: 1 });

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
    const mantencionActualizado = await Mantencion.findByIdAndUpdate(req.params.id, {
      descripcion: req.body.descripcion,
      categoria: req.body.categoria,
      fecha_inicio: req.body.fecha_inicio,
      fecha_termino: req.body.fecha_termino,
      imagen_antes: req.files.imagen_antes[0].path,
      imagen_despues: req.files.imagen_despues[0].path,
      empresa: req.body.empresa,
      costo: req.body.costo,
      estado: req.body.estado
    }, {
      new: true
    });

    if (!mantencionActualizado) {
      return res.status(404).json({
        message: 'Mantencion no existe'
      });
    }
  
    return res.json({
      message: 'Mantencion actualizado correctamente',
      mantencion: mantencionActualizado
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const deleteMantencionById = async (req, res) => {
  try {
      const mantencionEliminado = await Mantencion.findByIdAndDelete(req.params.id);

    if (!mantencionEliminado) {
      return res.status(404).json({
        message: 'Mantencion no existe'
      });
    }
  
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