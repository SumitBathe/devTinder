const express = require("express");
const app = express();



app.use("/test",(req,res)=>{
    res.send("testing server")
})

app.use("/hello",(req,res)=>{
    res.send("Hello hello hello")
})
app.use("/home",(req,res)=>{
    res.send("testing home server")
})

app.listen(7777,()=>{
    console.log("Server running sucessfully");
    
});