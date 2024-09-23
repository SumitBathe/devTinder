const express = require("express");
const app = express();

app.use("/user",(req,res,next)=>{
    console.log("request Handler 1");
    next();
    res.send("response 1");
    
},[
(req,res,next)=>{
    console.log("Request Handler 2");
    next()
}],
(req,res)=>{
    console.log("Request Handler 3");    
}
//we can make a chain of request handler 
//we can store this chain in array or some request handler in array as well
)    

app.listen(7777,()=>{
    console.log("Server running sucessfully");
    
});