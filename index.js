const express = require("express")
const mongoose= require("mongoose")
const bodyParser= require("body-parser")
const app=express()
const dotenv=require("dotenv") 


dotenv.config()
const port = process.env.PORT || 3000;

const username= process.env.MONGODB_USERNAME
const password= process.env.MONGODB_PASSWORD

mongoose.connect(`mongodb+srv://${username}:${password}@notorious.vm8w9sa.mongodb.net/registrationFormDb`,
{
    

   

});

const registrationSchema = new mongoose.Schema({
   name : String,
   email : String,
   password : String,

});

const Registration= mongoose.model("registration", registrationSchema);

app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/pages/index.html")
})

app.post("/register", async (req,res)=>{
    try{
const{name,email,password}=req.body;

const existingUser= await Registration.findone({email:email});
//we are checking for existing user
if(!existingUser){

const registrationData= new Registration({
    name,
    email,
    password
});
await registrationData.save();
res.redirect("/success");}
else{
    console.log("user already exists");
    res.redirect("/error")
}

    }
    catch(error){
        console.log("error");
        res.redirect("error");

    }
})

app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/pages/success.html");

})

app.get("/error",(req,res)=>{
    res.sendFile(__dirname+"/pages/success.html");

})
app.listen(port,()=>{
    console.log(`hello server is running on port ${port}`)
})