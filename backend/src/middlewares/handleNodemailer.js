const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendCorreo = async (req, res, next) => {
  try {
    const { userEmails, asunto, descripcion } = req.body;

    const email = process.env.EMAIL;
    const email_pass = process.env.EMAIL_PW;

    if (!email_pass) {
      return res.status(500).send({
        message: "No se ha entregado la contraseña de aplicación para el correo"
      });
    }
    if (!userEmails || userEmails.length === 0) {
      return res.status(500).send({
        message: "No se han entregado los correos de destino"
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: email,
        pass: email_pass
      }
    });

    const mailOptions = {
      from: email,
      to: userEmails.toString(),
      subject: asunto,
      text: descripcion
    };

    await transporter.sendMail(mailOptions);

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

module.exports = sendCorreo;