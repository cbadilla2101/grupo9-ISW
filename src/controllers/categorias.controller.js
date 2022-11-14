const Categoria = require('../models/Categoria');

const createCategoria = async (req, res) => {
  try {
    const categoria = new Categoria({
      nombre: req.body.nombre
    });

    const nuevaCategoria = await categoria.save();
  
    return res.status(201).json({
      message: 'Categoria guardada correctamente',
      categoria: nuevaCategoria
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();

    return res.json(categorias);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        message: 'Categoria no exite'
      });
    }
  
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const updateCategoriaById = async (req, res) => {
  try {
    const CategoriaActualizada = await Categoria.findByIdAndUpdate(req.params.id, {
      nombre: req.body.nombre
    }, {
      new: true
    });

    if (!CategoriaActualizada) {
      return res.status(404).json({
        message: 'Categoria no existe'
      });
    }
  
    return res.json({
      message: 'Categoria actualizada correctamente',
      categoria: CategoriaActualizada
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const deleteCategoriaById = async (req, res) => {
  try {
    const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);

    if (!categoriaEliminada) {
      return res.status(404).json({
        message: 'Categoria no existe'
      });
    }
  
    return res.json({
      message: 'Categoria eliminada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createCategoria,
  getCategorias,
  getCategoriaById,
  updateCategoriaById,
  deleteCategoriaById
}