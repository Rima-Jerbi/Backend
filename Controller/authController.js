const UserService = require("../Service/authService");
const Roles = require("../model/role");
const SerialNumber = require("../model/serialNumber");
const sendVerificationEmail = require('../utils/sendVerificationEmail'); // Assurez-vous que ce chemin est correct

module.exports = class User {
    static async apiCreateUser(req, res, next) {
        try {
            console.log("Request body:", req.body);
            const user = {
                name: req.body.name,
                email: req.body.email,
                photo: req.file ? `/uploads/${req.file.filename}` : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
                password: req.body.password,
                role: req.body.role,
                username: req.body.username,
                serialNumber: req.body.serialNumber,
            };

            if (user.role === Roles.admin) {
                const serialNumber = await SerialNumber.findOne({ number: user.serialNumber });
                if (!serialNumber) {
                    console.log("Invalid serial number");
                    return res.status(400).json({ message: "Invalid serial number" });
                }
            }

            const createdUser = await UserService.registerExposant(user);

            if (user.role === Roles.admin) {
                await sendVerificationEmail(createdUser); // Envoyer un email pour vérifier l'admin
                res.status(201).json({ message: "Admin created. Verification email sent." });
            } else {
                res.status(201).json(createdUser);
            }
        } catch (error) {
            console.error("Error in apiCreateUser:", error);
            if (error.message === "Email already exists") {
                res.status(400).json({ message: "Email already exists" });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    static async apiLoginUser(req, res, next) {
        try {
            const user = {
                email: req.body.email,
                password: req.body.password
            };
            const LoginUser = await UserService.userLogin(user);
            res.status(201).json(LoginUser);
        } catch (error) {
            console.error("Error in apiLoginUser:", error);
            res.status(500).json({ error: error.message });
        }
    }
};
