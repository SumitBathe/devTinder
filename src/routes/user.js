const express = require("express")
const { userAuth } = require("../middleware/auth")
const ConectionRequest = require("../models/conectionRequest")

const userRouter = express.Router()

userRouter.get("/user/request/recived",userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user
        const recivedRequest = await ConectionRequest.find({
            toUserId : loggedInUser._id,
            status : "intrested"
        }).populate("fromUserId","firstName lastName age skills gender photoUrl about")

        res.json({
            message:"Pending request fetched successfuly",
            recivedRequest
        })
        
    } catch (error) {
        res.status(400).send("Error "+error.message)
    }
})

module.exports = userRouter