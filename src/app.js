const express = require("express");
const app = express();

app.use("/user",(req,res,next)=>{
    console.log("request Handler 1");
    next(); 
    //This is middleware
}) 

app.post("/user",(req,res,next)=>{
    console.log("1 response in post ");
    next()
    //this is middleware
},(req,res)=>{
    console.log("2nd response in post");
    res.send("Response Handller")
    //This is actually a route Handler
})

app.listen(7777,()=>{
    console.log("Server running sucessfully");
    
});