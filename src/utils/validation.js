const validator = require("validator")

const userValidation = (req)=>{
    const {firstName,lastName,emailId,password} = req.body

    if(!(firstName || lastName)){
        throw new Error("Name is Required")
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Email Id is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password not valid")
    }

    const ALLOWED_DATA = ["firstName","lastName","emailId","password","age","photoUrl","gender","about","skills"]
        isDataAllowed = Object.keys(req.body).every((key)=>ALLOWED_DATA.includes(key))
        if(!isDataAllowed){
            throw new Error("Data not allowed to signup")           
        }
        if(req.body.skills.length>4){
            throw new Error("Skills can not be more than 4.")
        }
}

const validateUpdates = (req)=>{
    const allowedEditFields = ["firstName","lastName","age","gender","about","photoUrl","skills"]

    isEditAllowed = Object.keys(req.body).every((key)=>allowedEditFields.includes(key))

    return isEditAllowed
}

module.exports = {userValidation,validateUpdates}