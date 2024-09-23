const express = require("express");
const app = express();
const {adminAuth, userAuth} = require("./middleware/auth")

app.use("/admin",adminAuth) 
app.use("/admin",userAuth) 

app.get("/admin/getAllData",(req,res,next)=>{
    console.log("Get the all admin data");   
    res.send("Get all data")
})
app.get("/admin/deleteAdmin",(req,res,next)=>{
    console.log("Admin deleted");  
    res.send("Admin deleted") 
})

app.delete("/user/deleteUser",(req,res,next)=>{
    console.log("user deleted");  
    res.send("user deleted") 
})

app.get("/user/getUser",(req,res,next)=>{
    console.log("get the user");  
    res.send("user get") 
})

app.post("/user/postUser",(req,res,next)=>{
    console.log("Post the user");  
    res.send("user Post") 
})

app.patch("/user/updateUser",(req,res,next)=>{
    console.log("Put the user");  
    res.send("user updated") 
})

app.listen(7777,()=>{
    console.log("Server running sucessfully");
    
});