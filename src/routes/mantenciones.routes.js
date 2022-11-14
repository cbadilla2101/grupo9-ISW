const { Router } = require('express');
const {
  createMantencion,
  getMantenciones,
  getMantencionById,
  updateMantencionById,
  deleteMantencionById
} = require('../controllers/mantenciones.controller');
const upload = require('../middlewares/handleMulter');
const handleErrors = require('../middlewares/handleErrors');

const router = Router();

router.get('/mantenciones', getMantenciones);

router.post('/mantencion', upload.fields([
  { name: 'imagen_antes', maxCount: 1 },
  { name: 'imagen_despues', maxCount: 1 }
]), handleErrors, createMantencion);

router.route('/mantencion/:id')
  .get(getMantencionById)
  .put(upload.fields([
    { name: 'imagen_antes', maxCount: 1 },
    { name: 'imagen_despues', maxCount: 1 }
  ]), handleErrors, updateMantencionById)
  .delete(deleteMantencionById);

module.exports = router;