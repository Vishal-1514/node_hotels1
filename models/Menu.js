const mongoose=require('mongoose')

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['spicy','sweet','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingridents:{
        type:[String],
        default:[]

    },
    sales:{
        type:Number,
        default:0
    }
})

const Menu=mongoose.model('Menu',menuSchema);
module.exports=Menu