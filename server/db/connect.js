let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Authusers",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("database connected")).catch((err)=>{
    console.log(err)
})