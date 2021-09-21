const express = require('express');
const router =express.Router();
const Product = require("../models/product")
const mongoose = require('mongoose');
const createError = require('http-errors');


router.get("/",async(req,res,next)=>{
    try {
        const results = await Product.find({},{__v:0,});
        res.send(results);
    } catch (error) {
        
    }
});


router.post("/",async (req,res,next)=>{
 
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error) {
        if(error.name === 'ValidationError'){
            next(createError(422,error.message))
            return;
            }
            next(error);
    }

});

router.get("/:id",async(req,res,next)=>{
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if(!product){
            throw createError(404,'Product does not exist....');
        }
        res.send(product);
        
    } catch (error) {
        if(error instanceof mongoose.CastError){
            next(createError(400,"Invalid Product Id"));
            return; 
        }
        next(error)
    }
});

router.patch("/:id",async(req,res,next)=>{
    try {
        const id = req.params.id;
        const update = req.body;
        const result = await Product.findByIdAndUpdate(id,update,{
            new:true
        });
        if(!result){
            throw createError(404,'Product does not exist');
        }
        res.send(result);
        
    } catch (error) {
        if(error instanceof mongoose.CastError){
            next(createError(400,"Invalid Product Id"));
            return; 
        }
        next(error)
        
    }
});

router.delete("/:id",async(req,res,next)=>{
  try {
    const id = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if(!deleteProduct){
        throw createError(404,'Product does not exist....');
    }

    res.send(deleteProduct);
      
  } catch (error) {
    if(error instanceof mongoose.CastError){
        next(createError(400,"Invalid Product Id"));
        return; 
    }
    next(error);
  }
    
});



module.exports=router