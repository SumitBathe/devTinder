const express = require("express");
const app = express();


app.get("/user",(req,res)=>{
    res.send("Get user sucessfully")
})

app.post("/user",(req,res)=>{
    //posting data on DB
    res.send("post user data sucessfully")
})

app.patch("/user",(req,res)=>{
    res.send("patch data to user sucessfully")
})

app.delete("/user",(req,res)=>{
    res.send("delete user sucessfully")
})

app.use("/test/test1",(req,res)=>{
    res.send("testing test2 server")
})  

// while writing routes maintain the order is importent

app.listen(7777,()=>{
    console.log("Server running sucessfully");
    
});