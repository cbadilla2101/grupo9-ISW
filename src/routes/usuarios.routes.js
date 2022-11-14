const { Router } = require('express');
const {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuarioById,
  deleteUsuarioById
} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/usuarios', getUsuarios);

router.post('/usuario', createUsuario);

router.route('/usuario/:id')
  .get(getUsuarioById)
  .put(updateUsuarioById)
  .delete(deleteUsuarioById);

module.exports = router;