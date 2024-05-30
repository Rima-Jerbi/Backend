const express = require('express');
const EventCtrl = require("../Controller/evenementController");
const multer = require('multer');
const router = express. Router();
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) 
  }
});
const upload = multer({ 
  storage: storage,
  fileField: 'photo' 
});


router.post("/create", upload.single('photo'), EventCtrl.apiCreateEvent)
router.get("/all",EventCtrl.apiGetAllEvent )
router.get("/getid/:id",EventCtrl.apiGetEventById)
router.delete("/deletebyid/:id",EventCtrl.apiDeleteEvent)
router.put("/update/:id",EventCtrl.apiUpdateEvent)
router.post("/addReservation/:id", EventCtrl.addReservation)







module.exports = router;