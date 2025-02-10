const express=require('express')
const app=express();
const db=require('./db')
const bodyParser=require('body-parser')
app.use(bodyParser.json());
const Menu=require('./models/Menu')

const Person= require('./models/Person')

app.get('/',function(req,res){
    console.log("welcome ");
    res.send("welcome")

})






//Import router files
const personRoutes= require('./routes/personRoutes')
const menuRoutes=require('./routes/menuRoutes')


//use person route
app.use('/person',personRoutes)
app.use('/menu',menuRoutes)

app.listen(3000,()=>{
    console.log("listening on port 3000")
})