const express = require("express")
const authRouter = express.Router();
const bcrypt = require("bcrypt")

const {userValidation} = require("../utils/validation")
const User = require("../models/user")

authRouter.post("/signup",async (req,res)=>{      
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

authRouter.post("/login", async (req,res)=>{
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

module.exports= authRouter
