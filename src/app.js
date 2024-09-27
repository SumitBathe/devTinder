const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const User = require("./models/user")
const {userValidation} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

app.use(express.json())     // this is an middleware to conver json to jsobject given by express
app.use(cookieParser())     // this is an middleware to help reading cookies in req

//API - signup for user
app.post("/signup",async (req,res)=>{      
    try{
        userValidation(req);
        const {password,firstName,lastName,emailId} = req.body
        const decryptedPassword = await bcrypt.hash(password,10);  
        const data = new User({
            firstName,lastName,emailId,password:decryptedPassword
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
        const isRegisterUser =await bcrypt.compare(password, user.password)
        if(!isRegisterUser){
            throw new Error("Invalid password")
        }else{
            const token = await jwt.sign({_id : user._id},"Dev@Tinder987")            
            res.cookie('token',token)
            res.send("User Login Succesfully")
        }
    } catch (error) {
       res.status(400).send("sommthing went Wrong "+error) 
    }
})

app.get("/profile", async (req,res)=>{
   try {
    const {token} = req.cookies 
    const isLoggedUser = await jwt.verify(token,"Dev@Tinder987")
    const {_id} = isLoggedUser
   
    const user = await User.findById(_id)
    if(!user){
        throw new Error("User not found");
        
    }
    res.send(user)
    
   } catch (error) {
    res.status(400).send("somthing went wrong")
   }
})

//API - find user by emailId
app.get("/user",async (req,res)=>{
    const userId = req.body.emailId

    try {
        const users = await User.find({emailId: userEmail})
        if(users.length===0){
            res.status(404).send("User not found")
        }else{
            res.send(users)
        }        
    } catch (error) {
        res.status(400).send("somthing went wrong")
    }
})

//API - find users for feed
app.get("/feed",async (req,res)=>{
    try {
        const users =await User.find({})
        res.send(users)
    } catch (error) {
        res.status(400).send("somthing went wrong")
    }
})

//API - delete a user by id
app.delete("/user", async (req,res)=>{
    const userId = req.body.userId

    try {
        //await User.findByIdAndDelete({_id : userId}) // you can write like this as well
        await User.findByIdAndDelete(userId)
        res.send("User deleted succesfully")
    } catch (error) {
        res.status(400).send("somthing went wrong")
    }   
})

//API - Update a User
app.patch("/user/:userId", async (req,res)=>{
    const userId = req.params?.userId
    const updateData = req.body

    try {
        const UPDATE_ALLOWED = ["lastName","photoUrl","password","gender","age","about","skills"]
        const isUpdateAllowed = Object.keys(updateData).every((k)=>           
            UPDATE_ALLOWED.includes(k)
        )
        if(!isUpdateAllowed){
            throw new Error("Update not allowed")
        }
        if(req.body.skills.length>4){
            throw new Error("Skills can not be more than 4.")
        }
        const user = await User.findByIdAndUpdate({_id : userId},updateData,{returnDocument:"before",runValidators:true})
        console.log(user)
        res.send("User updated Successfully")
    } catch (error) {
        res.status(400).send("somthing went wrong " + error.message)
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