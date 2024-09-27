const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const User = require("./models/user")
const {userValidation} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middleware/auth")

app.use(express.json())     // this is an middleware to conver json to jsobject given by express
app.use(cookieParser())     // this is an middleware to help reading cookies in req

//API - signup for user
app.post("/signup",async (req,res)=>{      
    try{
        userValidation(req);
        const {password,firstName,lastName,emailId,age} = req.body
        const decryptedPassword = await bcrypt.hash(password,10);  
        const data = new User({
            firstName,lastName,emailId,password:decryptedPassword,age
        })
        
        await data.save();
        res.send("user Added sucessfully")
    }
    catch(err){
        res.status(400).send("User not added: "+err)
    }     
})

//API - Login for register user
app.post("/login", async (req,res)=>{
    try {
        const {password,emailId} = req.body;

        const user =await User.findOne({emailId : emailId})
        if(!user){
            throw new Error("Invalid email credentials");            
        }
        const isRegisterUser =await user.passwordValidate(password)
        if(!isRegisterUser){
            throw new Error("Invalid password")
        }else{
            const token = await user.getJwt()           
            res.cookie('token',token,{expires:new Date(Date.now() + 8 * 3600000)})
            res.send("User Login Succesfully")
        }
    } catch (error) {
       res.status(400).send("sommthing went Wrong "+error) 
    }
})

app.get("/profile",userAuth, async (req,res)=>{
   try {
    const user = req.user   
    res.send(user)
    
   } catch (error) {
    res.status(400).send("somthing went wrong")
   }
})

app.post("/sendConnectionRequest",userAuth, (req,res)=>{
    const user = req.user
    res.send(user.firstName +" send a connection request")
})


connectDB().then(()=>{
    console.log("connection establish to the database");
    app.listen(7777,()=>{
        console.log("Server running sucessfully");
        
    });
    
}).catch((err)=>{
    console.log(err);    
})