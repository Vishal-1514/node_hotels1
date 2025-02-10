require('dotenv').config()
const mongoURL= process.env.mongo_URL ;
const mongoose=require('mongoose')



//setup the connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("connected to mongodb server")

});
db.on('error',(err)=>{
    console.log("error to connect mongodb server",err)
});
db.on('disconnected',()=>{
    console.log("disconnected to mongodb server ")
})

module.exports=db;