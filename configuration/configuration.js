const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/FairManagementPFE2") 
.then(()=>{
    console.log("Connected Successfuly");
})
.catch((err)=>{console.log(err);

})
module.exports= mongoose