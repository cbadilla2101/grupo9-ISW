const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuario');
const dotenv = require('dotenv');

dotenv.config();

const sendmail = async (req, res) => {
  try {
    const { mensaje } = req.body;
    let directory = [];

    const usuarios = await Usuario.find({}, {email: 1, _id: 0});
    for (let i = 0; i < usuarios.length; i++) {
      directory.push(usuarios[i].email);
    }

    const mail = 'mantenciondecondominio@gmail.com';
    const token = process.env.EMAIL_PW;
  
    if (!token) {
      return res.status(400).send({
        message: "No se ha entregado la contraseña de aplicación para el correo"
      });
    }
  
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: mail,
        pass: token
      }
    });
  
    const mailOptions = {
      from: mail,
      to: directory,
      subject: 'Aviso de Mantención de Instalación',
      text: mensaje
    };
  
    const info = await transporter.sendMail(mailOptions);

    return res.status(200).send({
      message: 'Mensaje enviado',
      mailInfo: info
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
}

module.exports = sendmail;