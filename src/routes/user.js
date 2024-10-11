const express = require("express")
const { userAuth } = require("../middleware/auth")
const ConectionRequest = require("../models/conectionRequest")
const { Connection, set } = require("mongoose")
const User = require("../models/user")

const userRouter = express.Router()
const USER_SAFE_DATA = "firstName lastName age about gender skills photoUrl"

userRouter.get("/user/request/recived",userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user
        const recivedRequest = await ConectionRequest.find({
            toUserId : loggedInUser._id,
            status : "intrested"
        }).populate("fromUserId",USER_SAFE_DATA)

        res.json({
            message:"Pending request fetched successfuly",
            recivedRequest
        })
        
    } catch (error) {
        res.status(400).send("Error "+error.message)
    }
})

userRouter.get("/user/connection",userAuth, async (req,res)=>{   

    try {
        const loggedInUser = req.user

        const userConnection = await ConectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)

        const data = userConnection.map((item)=>{
            if(item.toUserId.equals(loggedInUser._id)){
                return item.fromUserId
            }
            return item.toUserId
        })

        res.json({
            message:"Yours Connections",
            data
        })
        
    } catch (error) {
        res.status(400).send("Error "+error.message)
    }
})

userRouter.get("/user/feed",userAuth, async (req,res)=>{
    try {

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const skip = (page-1)*limit

        const loggedInUser = req.user;

        const getConnection = await ConectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

        const hideUserFromFeed = new Set();

        getConnection.forEach(req=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })

        const userFeed = await User.find({        
            $and:[
                {
                    _id: {$nin:Array.from(hideUserFromFeed)}
                },{
                    _id:{$ne:loggedInUser._id}
                }
            ]        
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.send(userFeed)
        
    } catch (error) {
        res.status(400).send("Error "+error.message)
    }
})

module.exports = userRouter