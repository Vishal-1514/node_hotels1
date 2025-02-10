const express=require('express');
const router=express.Router();

const Menu=require('./../models/Menu')

//Menu routes
router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenu=new Menu(data);
        const response=await newMenu.save();
        console.log("data saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal sever error'})
    }
})
//menu get request
router.get('/',async(req,res)=>{
    try{
        const data= await Menu.find();
        console.log("data  fatched");
        res.status(200).json(data);
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})

    }
})

router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType= req.params.tasteType;
        if(tasteType=='sweet' || tasteType=='sour' || tasteType=='spicy'){
            const response=await Menu.find({taste:tasteType})
            res.status(200).json(response);
            console.log("data fetched")
        }else{
            res.status(500).json({error:"invalid taste type"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;
        const updateData=req.body;
        const response=await Menu.findByIdAndUpdate(menuId,updateData,{
            new:true,
            runValidators:true
        })
        if(!response){
            res.status(500).json({error:"invalid Menu id"})
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
        const menuId=req.params.id;
        const response=await Menu.findByIdAndDelete(menuId);
        if(!response){
            res.status(500).json({error:'internal server error'})
        }
        res.status(200).json(response);
        console.log("data deleted")

    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})

    }    
    
})

module.exports=router;