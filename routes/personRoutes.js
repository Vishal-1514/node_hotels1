const express=require('express');
// const { model, Model } = require('mongoose');
const router=express.Router();
const Person= require('./../models/Person');
const { findByIdAndUpdate } = require('../models/Menu');


router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log("data saved successfully");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }

})

router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log("data  fatched");
        res.status(200).json(data);
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})

    }
})

//fetched data according to worktype
router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef' || workType=='waiter' || workType == 'manager'){
            const response=await Person.find({work:workType});
            console.log("data fetched")
            res.status(200).json(response)

        }else{
            res.status(500).json({error:"invalid worktype"})

        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updateId=req.body;

        const response=await Person.findByIdAndUpdate(personId,updateId ,{
            new:true,
            runValidators:true
        })
        if(!response){
            res.status(500).json({error:"invalid id"})
        }
        res.status(200).json(response);
        console.log("data updated")
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId= req.params.id;
        const response= await Person.findByIdAndDelete(personId)
        if(!response){
            res.status(500).json({error:"invalid id"})
        }
        res.status(200).json(response);
        console.log("data deleted")

    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})

    }
})

module.exports=router;
