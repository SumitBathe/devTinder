const express = require("express")
const profileRouter = express.Router()
const validator = require("validator")
const bcrypt = require("bcrypt")

const {userAuth} = require("../middleware/auth")
const {validateUpdates} = require("../utils/validation")

profileRouter.get("/profile",userAuth, async (req,res)=>{
    try {
     const user = req.user   
     res.send(user)
     
    } catch (error) {
     res.status(400).send("somthing went wrong")
    }
 })

 profileRouter.patch("/profile",userAuth,async (req,res)=>{
    try {  
          
        if (!validateUpdates(req)) {
            throw new Error("Edit not allowed");            
        }
        const loggedInUser = req.user

        const updateUser = Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key])
      
        await loggedInUser.save()
        //res.send("User Updated sucessfuly")    
        res.json({message: `${loggedInUser.firstName} Your Profile updated successfuly` ,data : loggedInUser})   
        
    } catch (error) {
        res.status(400).send("somthing went wrong "+error.message)
    }
 })

 profileRouter.patch("/changePassword",userAuth, async (req,res)=>{
    try {
        const {existingPassword,newPassword} = req.body

    const user = req.user
    const isPasswordMatch = await user.passwordValidate(existingPassword)

    if(!isPasswordMatch){
        throw new error("Password not correct")
    }else{
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("Password not valid")
        }
        const decryptedPassword = await bcrypt.hash(newPassword,10);  
        user.password = decryptedPassword 

        await user.save()
        res.send("Password change sucessfuly...")
    }
    } catch (error) {
        res.status(400).send("somthing went wrong "+error.message)
    }


 })

module.exports = profileRouter;