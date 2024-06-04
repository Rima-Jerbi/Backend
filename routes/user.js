const express = require('express');
const multer = require('multer');
const path = require('path');
const UserController = require('../Controller/userController');

const router = express.Router();

// Configuration de Multer pour stocker les fichiers dans un répertoire 'uploads'
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limite de taille de fichier à 1MB
});

router.get("/", UserController.getAllUsers);
router.post("/", upload.single('image'), UserController.createUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", upload.single('image'), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
