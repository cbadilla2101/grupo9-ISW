const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.set('port', process.env.PORT);

app.use(cors());
app.use(express.json());
app.options('*', cors());

app.get('/', (req, res) => res.json('API Mantencion de Instalaciones'));

module.exports = app;