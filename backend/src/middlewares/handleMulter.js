const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nameFile = Date.now() + ext;

    cb(null, nameFile);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif') {
        return cb(new Error('Tipo de archivo no soportado.'));
    }

    cb(null, true);
  }
});

module.exports = upload;