let mongoose = require("mongoose");
let validator = require("validator")
let bcrypt = require('bcryptjs');
let jwt = require("jsonwebtoken")
let secretKey ="Gaurav@1456avengerendgame"
let userShema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not valid email")
            }
        }

    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    Cpassword:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})
//hash password
userShema.pre("save",async function(next){
  // if(this.isModified(this.password)){
        this.password = await bcrypt.hash(this.password,12);
        this.Cpassword = await bcrypt.hash(this.Cpassword,12);

   // }
  
    next();
})

//token generation
userShema.methods.generateAuthtoken = async function(){
    try {
        let tokenGen = jwt.sign({_id:this._id},secretKey,{
            expiresIn:"1d"
        })
        this.tokens=this.tokens.concat({token:tokenGen});
        await this.save();
        return tokenGen;

    } catch (error) {
        res.status(401).json(error);
    }
}

// creating model
let userdb = new mongoose.model("users",userShema)
module.exports=userdb;