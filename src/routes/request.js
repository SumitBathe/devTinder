const express = require("express")
const requestRouter = express.Router()

const {userAuth} = require("../middleware/auth")
const ConectionRequest = require("../models/conectionRequest")
const User = require("../models/user")

requestRouter.post("/sendConnectionRequest/:status/:toUserId",userAuth,async (req,res)=>{
    
    try {
        const toUserId = req.params.toUserId
        const status = req.params.status
        const fromUserId = req.user._id  
        
        const isUserValid = await User.findById(toUserId)

        if(!isUserValid){
            return res.status(404).send("User Not found")
            //throw new Error("User Not found");            
        }

        const statusValues =["intrested","ignored"]
        const isStatusValid = statusValues.includes(status)
      
        if(!isStatusValid){
            throw new Error("Status not Valid");
        }

        const isRequestExiest = await ConectionRequest.findOne({
            $or:[{
                toUserId ,fromUserId
            },{
                toUserId:fromUserId,
                fromUserId:toUserId
            }]  
        })      
        
        if(isRequestExiest){
            throw new Error("Request allready present");
        }

        const newConectionRequest = new ConectionRequest({
            toUserId,status,fromUserId
        })

        const data = await newConectionRequest.save()
        res.json({message:"connection request send successfuly..",
            data
        })
    } catch (error) {
        res.status(400).send("Error - "+error.message)
    }
    
})

requestRouter.post("/reviewConnectionRequest/:status/:requestId",userAuth, async (req,res)=>{
    try {
        const {status, requestId} = req.params
        const loggedInUserId = req.user._id

        const statusValues = ["accepted","rejected"]
        const isStatusValid = statusValues.includes(status)
        
        if(!isStatusValid){
            return res.status(404).send("Status not valid")
        }

        const isRequestValid = await ConectionRequest.findOne({
            _id:requestId,
            status:"intrested",
            toUserId:loggedInUserId
        })

        if(!isRequestValid){
            return res.status(404).send("Request not present")
        }

        isRequestValid.status = status

        const data = await isRequestValid.save()
        res.json({message:`request ${status} successfuly`,
            data
        })
        
    } catch (error) {
        res.status(400).send("Error "+error.message)
    }
})

module.exports = requestRouter