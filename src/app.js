const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json())     // this is an middleware to conver json to jsobject given by express

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

app.get("/user",async (req,res)=>{
    const userId = req.body.id

    try {
        const users = await User.findById({_id : userId})
        if (!users) {
            res.status(404).send("user not found")
        } else {
            res.send(users)
        }
    } catch (error) {
        res.status(400).send("somthing went wrong")
    }

    // try {
    //     const users = await User.find({emailId: userEmail})
    //     if(users.length===0){
    //         res.status(404).send("User not found")
    //     }else{
    //         res.send(users)
    //     }
        
    // } catch (error) {
    //     res.status(400).send("somthing went wrong")
    // }

    // try {
    //     const users = await User.findOne({emailId: userEmail})
    //     if(!users){
    //         res.status(404).send("User not found")
    //     }else{
    //         res.send(users)
    //     }        
    // } catch (error) {
    //     res.status(400).send("somthing went wrong")
    // }      
    
})

app.get("/feed",async (req,res)=>{
    try {
        const users =await User.find({})
        res.send(users)
    } catch (error) {
        res.status(400).send("somthing went wrong")
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