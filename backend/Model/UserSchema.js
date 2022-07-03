const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const { token } = require("morgan");
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,        
    },
    
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    psw:{
        type:String,
        required:true
    },
    pswrepeat:{
        type:String,
        required:true
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

UserSchema.pre("save",async function(next){
   
    if(this.isModified("psw")){
        console.log(`this is our password ${this.psw}`);
        this.psw = await bcrypt.hash(this.psw,10);
        this.pswrepeat = await bcrypt.hash(this.pswrepeat,10);
        console.log(`this is our password ${this.psw}`);   
        
        // this.pswrepeat=undefined;
    }
    next();

})

// we are generating tokens 
UserSchema.methods.generateAuthToken = async function () {
         try {
            let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({token:token});
            await this.save();
            return token;
         } catch (error) {
            console.log(error);
         }
}


const User = new mongoose.model("User",UserSchema);
module.exports= User;