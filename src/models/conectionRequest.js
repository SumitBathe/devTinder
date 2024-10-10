const mongoose = require("mongoose")

const conectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId, 
        required:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type: String,
        enum:{
            values:["intrested","ignored","acepted","rejected"],
            message: `{VALUE} is incorrect status type`
        }       
    }
},
{
    timestamps:true
})

conectionRequestSchema.pre("save", function (next) {
   const conectionRequest = this
    if(conectionRequest.toUserId.equals(conectionRequest.fromUserId)){
        throw new Error("You can not send request to yourself");  
    }
    next()
})

const ConectionRequestModel = mongoose.model("ConectionRequestSchema",conectionRequestSchema)

module.exports = ConectionRequestModel