const multer = require('multer');
filename ="";
const mystorage = multer.diskStorage ({
destination: './uploads',
filename: (req, file, redirect)=>{
let date = Date.now();
let fl= date + '.' + file.mimetype.split('/') [1];
redirect (null ,fl);
filename = fl;
}
})
const upload = multer({storage: mystorage});
module.exports= upload