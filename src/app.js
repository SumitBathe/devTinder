const express = require("express");
const app = express();


app.post("/user/:userId/:name",(req,res)=>{
    //posting data on DB
    console.log(req.params);    
    res.send("post user data sucessfully")
})

// while writing routes maintain the order is importent

app.listen(7777,()=>{
    console.log("Server running sucessfully");
    
});