const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors");


const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())     // this is an middleware to conver json to jsobject given by express
app.use(cookieParser())     // this is an middleware to help reading cookies in req


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)










connectDB().then(()=>{
    console.log("connection establish to the database");
    app.listen(7777,()=>{
        console.log("Server running sucessfully");
        
    });
    
}).catch((err)=>{
    console.log(err);    
})