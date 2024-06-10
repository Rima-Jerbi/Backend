const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: '7487f4003@smtp-brevo.com', // Utilisez l'identifiant SMTP fourni par Brevo
    pass: 'tqIT9gLaP6XzjD3x' // Utilisez la clé API fournie
  }
});

const mailOptions = {
  from: 'rima123.jerbi@gmail.com', // Votre email Brevo
  to: 'rima123.jerbi@gmail.com', // Remplacez par un email de test
  subject: 'Test Email',
  text: 'This is a test email'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent:', info.response);
});
