const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true,
        minLength : 4,
        maxLength: 30
    },
    lastName: {
        type: String,
        minLength:4,
        maxLength: 30,
    },
    emailId: {
        type: String,
        trim : true,
        required:true,
        lowercase: true,
        unique:true

    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 14
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        lowercase: true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");                
            }
        }
    },
    photoUrl: {
        type: String,
        default : "https://st4.depositphotos.com/9998432/22670/v/450/depositphotos_226700594-stock-illustration-person-gray-photo-placeholder-man.jpg",
        //default: "https://st4.depositphotos.com/9998432/24360/v/450/depositphotos_243600690-stock-illustration-person-gray-photo-placeholder-girl.jpg"
        
    },
    skills : {
        type: [String]
    },
    about: {
        type: String,
        default : "This is an a default about for user"
    }    
},{
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)