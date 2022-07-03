const jwt = require("jsonwebtoken");
// const User = require("../Model/UserSchema");
const UserSchema = require('../Model/UserSchema');

const Authenticate= async (req,res,next)=>{
   try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
    console.log(verifyToken);
    const rootUser = await UserSchema.findOne({_id:verifyToken._id,"tokens.token":token});
    
    if(!rootUser){throw new Error('User not found')}

    req.token = token;
    req.rootUser=rootUser;
    req.UserId=rootUser._id;
    next();

   } catch (error) {
    res.status(400).send("Unuthorized");
      console.log(error);
   }
}

module.exports = Authenticate;