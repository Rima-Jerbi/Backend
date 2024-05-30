const express = require('express');
const router = express. Router();
const foireCtrl = require("../Controller/foireController");
const passport = require("passport");
const Roles = require('../model/role');
const {  inRole } = require("../security/Rolemiddleware");


router.post('/create',foireCtrl.apiCreateFoire)

router.get("/all", foireCtrl.apiGetAllFoire)
router.get("/stands" ,foireCtrl.apiGetFoireStandsById)

router.get("/getid/:id",inRole(Roles.admin),foireCtrl.apiGetFoireById)
router.delete("/deletebyid/:id",foireCtrl.apiDeleteFoire)
router.put("/update/:id",foireCtrl.apiUpdateFoire)
module.exports = router;