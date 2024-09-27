const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email address not found "+value)
            }
        }

    },
    password: {
        type: String,
        minLength: 8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong")
            }
        }
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
        //default: "https://st4.depositphotos.com/9998432/24360/v/450/depositphotos_243600690-stock-illustration-person-gray-photo-placeholder-girl.jpg",
        validate(value){
            if(!(validator.isURL(value))){
                throw new Error("URl not valid ")
            }
        }
        
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
},



)
userSchema.methods.getJwt = async function () {
    const user = this;
    const token = await jwt.sign({_id : user._id},"Dev@Tinder987",{expiresIn: '7d'}) 

    return token;
}

userSchema.methods.passwordValidate = async function (passwordInputbyUser){
    const user = this;
    const isPasswordValidate = await bcrypt.compare(passwordInputbyUser, user.password)
    return isPasswordValidate
}

module.exports = mongoose.model("User", userSchema)