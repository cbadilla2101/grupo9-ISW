const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendCorreo = async (req, res, next) => {
  try {
    const { userEmails, asunto, descripcion } = req.body;

    const email = process.env.EMAIL;
    const email_pass = process.env.EMAIL_PW;

    if (!email_pass) {
      return res.status(400).send({
        message: "No se ha entregado la contraseña de aplicación para el correo"
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
      to: userEmails,
      subject: asunto,
      text: descripcion
    };

    await transporter.sendMail(mailOptions);

    next();
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

module.exports = sendCorreo;