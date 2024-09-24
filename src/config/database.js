const mongoose = require("mongoose")

const connectDB = async ()=> {
    await mongoose.connect("mongodb+srv://sumitbathe7:X4zFok5pogH3u3S0@namstenode.rqmby.mongodb.net/devTinder")
}

module.exports= {connectDB}