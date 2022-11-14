const { Router } = require('express');
const {
  createCategoria,
  getCategorias,
  getCategoriaById,
  updateCategoriaById,
  deleteCategoriaById
} = require('../controllers/categorias.controller');

const router = Router();

router.get('/categorias', getCategorias);

router.post('/categoria', createCategoria);

router.route('/categoria/:id')
  .get(getCategoriaById)
  .put(updateCategoriaById)
  .delete(deleteCategoriaById);

module.exports = router;