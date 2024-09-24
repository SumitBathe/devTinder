const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const User = require("./models/user")

app.post("/signup",async (req,res)=>{
    const user = new User({
        firstName : "Sachin",
        lastName : "Tendulkar",
        emailId : "sachintendulkar@gmail.com",
        age : 48
    }) 
    try{
        await user.save();
        res.send("user Added sucessfully")
    }
    catch(err){
        res.status(400).send("User not added: "+err)
    }     
})


connectDB().then(()=>{
    console.log("connection establish to the database");
    app.listen(7777,()=>{
        console.log("Server running sucessfully");
        
    });
    
}).catch((err)=>{
    console.log(err);    
})