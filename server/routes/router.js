let express = require("express");
let router = new express.Router();
let userdb = require("../models/userSchema");
let bcrypt = require('bcryptjs');
let authenticate = require("../middleware/authenticate")

router.post("/register",async(req,res)=>{
    let { fname, email, password, Cpassword } = req.body;

    if (!fname || !email || !password || !Cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }
    try {
        let preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== Cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            let finalUser = new userdb({
                fname, email, password, Cpassword
            });

            //  password hasing

            let storeData = await finalUser.save();

             console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }
        
    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
        
    }
    
});

//user login api

router.post("/login",async(req,res)=>{
    //console.log(req.body)
    let {  email, password} = req.body;

    if ( !email || !password ) {
        res.status(422).json({ error: "fill all the details" })
    }
    try {
        let userValid = await userdb.findOne({email:email});

        if(userValid){

            let isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();
                //console.log(token)
                //cookie generation
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                })
                let result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }

        
    } catch (error) {
        res.status(401).json(error);
    }
})

//valid user api

router.get("/validuser",authenticate,async(req,res)=>{
   try {
     let validuserone = await userdb.findOne({_id:req.userId});
     res.status(201).json({status:201,validuserone})
   } catch (error) {
    res.status(401).json({status:401,error})
   }
})

// user logout

router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})




module.exports=router;