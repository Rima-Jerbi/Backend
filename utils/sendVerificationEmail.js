const nodemailer = require('nodemailer');
const User = require('../model/user');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: '7487f4003@smtp-brevo.com', // Utilisez l'identifiant SMTP fourni par Brevo
        pass: 'tqIT9gLaP6XzjD3x' // Utilisez la clé API fournie
    }
});

const sendVerificationEmail = async (user) => {
    try {
        console.log("Sending verification email to:", user.email);
        const verificationUrl = `http://localhost:3002/auth/verify/${user._id}`; // Assurez-vous que l'URL est correcte
        const mailOptions = {
            from: 'rima123.jerbi@gmail.com', // Votre email Brevo
            to: 'rima123.jerbi@gmail.com', // Email du super admin
            subject: 'Admin Verification',
            text: `A new admin has registered. Click the link to verify: ${verificationUrl}\n\nDetails:\nName: ${user.name}\nEmail: ${user.email}\nSerial Number: ${user.serialNumber}`
        };

        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
};

module.exports = sendVerificationEmail;
