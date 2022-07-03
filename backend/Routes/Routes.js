const express = require('express');
const router = new express.Router();
const User = require('../Model/UserSchema');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Authenticate = require('../middleware/Authenticate');

router.get('/home',Authenticate,(req,res)=>{
    res.send(req.rootUser); 
    // res.send("hey");
    // res.render("index");
})
router.get('/user',async(req,res)=>{
   try{
       
        const getAllUser = await User.find({});
        res.status(201).send(getAllUser);  
    }catch(error){
       res.status(400).send(error);
    }
})

router.get('/user/:email',async(req,res)=>{
    try{
         const email = req.params.email;
         const getUser = await User.findOne({email});
         res.status(201).send(getUser);  
     }catch(error){
        res.status(400).send(error); 
     }
 })
 
 router.patch('/user/:email',async(req,res)=>{
    try{
         const email = req.params.email;
         const getUser = await User.findOneAndUpdate({email},req.body);
         res.status(201).send(getUser);  
     }catch(error){
        res.status(400).send(error);
     }
 })

//  update profile 
router.patch('/updateProfile',async(req,res)=>{
    try{
         const email = req.body.email;
         const getUser = await User.findOneAndUpdate({email},req.body);
         res.status(201).send(getUser);  
     }catch(error){
        res.status(400).send(error);
     }
 })
//  update password
router.patch('/updatePassword',async(req,res)=>{
    try{
        const email = req.body.email;
         const oldpsw = req.body.oldpsw;
         const psw = req.body.newpsw;
         console.log(oldpsw);
         console.log(psw);
         const userdata = await User.findOne({email});   
         const isMatch = await bcrypt.compare(oldpsw,userdata.psw);
         if(isMatch){
            const isMatch1 = await bcrypt.compare(psw,userdata.psw);
            if(!isMatch1){
                // const salt = await bcrypt.getSalt(10);
                const password = await bcrypt.hash(psw,10);
                const getUser = await User.findOneAndUpdate({email},{psw:password},{pswrepeat:password});
                res.send(getUser);
                
            }else{
                res.send("new and old password are same"); 
            }
         }
         else{
            res.send("your old password is incorrect");
         }
          
     }catch(error){
        res.status(400).send(error);
     }
 })


 router.delete('/user/:email',async(req,res)=>{
    try{
         const email = req.params.email;
         const getUser = await User.findOneAndDelete({email});
         res.status(201).send(getUser);  
     }catch(error){
        res.status(400).send(error);
     }
 })

// userData who logged in 
router.get('/getData',Authenticate,(req,res)=>{
    res.send(req.rootUser); 
})

 router.post('/register',async(req,res)=>{
    try{
        
        const psw = req.body.psw;
        const pswrepeat = req.body.pswrepeat;
        if(psw===pswrepeat)
        {
           const UserData = new User(req.body);
           console.log(UserData);
           const registered = await UserData.save();
           res.status(201).send(registered);  
        }
        else{
            res.status(400).send("password not matching");
        }
        
    }catch(error){
       res.status(400).send(error);
    }
})

// login page 
router.post('/login', async(req,res)=>{
    try{
         const email = req.body.email;
         const psw = req.body.psw;
         console.log(email);
         const userdata = await User.findOne({email});
         
         const isMatch = await bcrypt.compare(psw,userdata.psw);
        
         if(isMatch)
         {
            const token = await userdata.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
               httpOnly:true,
               expires:new Date(Date.now() + 25892000000)
            });
             res.send({message:'matched'});
         }
         else{
             res.send({message:'email or password are incorrect'});
         }
    }
    catch(error){
        res.status(400).send({message:'user not registerd yet'});
    }
})

// log out page
router.get('/logout',(req,res)=>{
    res.clearCookie("jwtoken",{path:'/'});
    res.status(200).send("user logout");
})



module.exports =  router;