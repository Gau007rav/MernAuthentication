let jwt = require("jsonwebtoken");
let userdb = require("../models/userSchema");
let secretKey ="Gaurav@1456avengerendgame"


let authenticate = async(req,res,next)=>{
   try {
      let token = req.headers.authorization;
      console.log(token)
      let verifyToken = jwt.verify(token,secretKey);
      //console.log(verifyToken)
      let rootUser = await userdb.findOne({_id:verifyToken._id});
      //console.log(rootUser)
      if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();
   } catch (error) {
    res.status(401).json({status:401,message:"Unauthorized no token provide"})
   }
}


module.exports= authenticate;