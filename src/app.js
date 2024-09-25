const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json())     // this is an middleware to conver json to jsobject given by express

//API - signup for user
app.post("/signup",async (req,res)=>{
    
    const user = new User(req.body) 
    try{
        await user.save();
        res.send("user Added sucessfully")
    }
    catch(err){
        res.status(400).send("User not added: "+err)
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
app.patch("/user", async (req,res)=>{
    const userId = req.body.userId
    const updateData = req.body

    try {
        await User.findByIdAndUpdate({_id : userId},updateData)
        res.send("User updated Successfully")
    } catch (error) {
        res.status(400).send("somthing went wrong")
    }
   
    // try {
    //     await User.findOneAndUpdate({emailId : userEmail},updateData)
    //     res.send("User updated Successfully")
    // } catch (error) {
    //     res.status(400).send("somthing went wrong")
    // }
})

connectDB().then(()=>{
    console.log("connection establish to the database");
    app.listen(7777,()=>{
        console.log("Server running sucessfully");
        
    });
    
}).catch((err)=>{
    console.log(err);    
})