const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productid:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,        
    },
    
    category:{
        type:String,
        required:true,   
    },
    brand:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    }
})


const Product = new mongoose.model("Product",ProductSchema);
module.exports= Product;