const express = require("express");
const app = express();
const {adminAuth, userAuth} = require("./middleware/auth")



app.get("/user",(req,res)=>{
    //  try {
    //      //logic of connecting database sending response
          throw new Error("fdajkfhakjfhasdlk somthing wrong");

    //      //res.send("user fetched data")
        
    //  } catch (error) {
    //      res.status(500).send("Something went wrong while fatching user")
    //  }
})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})

app.listen(7777,()=>{
    console.log("Server running sucessfully");
    
});