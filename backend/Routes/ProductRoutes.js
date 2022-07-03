const express = require('express');
const productRouter = new express.Router();
const Product = require('../Model/ProductSchema');
const Authenticate = require('../middleware/Authenticate');


// productRouter.get('/user/:email',async(req,res)=>{
//    try{
//         const email = req.params.email;
//         const getUser = await User.findOne({email});
//         res.status(201).send(getUser);  
//     }catch(error){
//        res.status(400).send(error);
//     }
// })

// delete Product
productRouter.delete('/deleteProduct/:productid',async(req,res)=>{
    try{
         const productid = req.params.productid;
         const getUser = await Product.findOneAndDelete({productid});
         res.status(201).send(getUser);  
     }catch(error){
        res.status(400).send(error);
     }
 })

 // update Product
productRouter.delete('/updateProduct/:productid',async(req,res)=>{
    try{
         const productid = req.params.productid;
         const getUser = await Product.findOneAndUpdate({productid},req.body);
         res.status(201).send(getUser);  
     }catch(error){
        res.status(400).send(error);
     }
 })


 // view product
productRouter.get('/viewProduct/:val',Authenticate,async(req,res)=>{
    try{
        const category = req.params.val; 
        console.log(category);
        const email = req.rootUser.email;
        
         const getAllProduct = await Product.find({email:email,category:category});
        //  console.log(getAllProduct);
         res.send(getAllProduct);
         // res.status(201).send(req.rootUser);  
     }catch(error){
        res.status(400).send(error);
     }
 })
 
// add product 
 productRouter.post('/addProduct',async(req,res)=>{
    try{
        // console.log(req.body.email);
        const productid = req.body.productid;
        const name = req.body.name;
        const category = req.body.category;
        const brand = req.body.brand;
        const amount = req.body.amount;
        const ProductData = new Product({productid,name,category,brand,amount});
        // console.log(ProductData);
        const addedProduct = await ProductData.save();
        res.send(addedProduct);
        
    }catch(error){
       res.status(400).send(error);
    }
})

module.exports =  productRouter;