
const express = require('express');
const router = express. Router();
const User = require ("../model/user")
const authCtrl = require("../Controller/authController");
router.post('/register', authCtrl.apiCreateUser);
router.post('/login', authCtrl.apiLoginUser);

 
module.exports = router;