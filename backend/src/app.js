const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const usuariosRoutes = require('./routes/usuarios.routes');

const app = express();

dotenv.config();

app.set('port', process.env.PORT);

app.use(cors());
app.use(express.json());
app.options('*', cors());

app.get('/', (_req, res) => res.json('API Mantencion de Instalaciones'));
app.use('/api', usuariosRoutes);

module.exports = app;