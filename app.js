const express=require("express");
const parser=require("body-parser");
const ejs=require("ejs");
const app=express();
const port=  3000;
const mongoose=require("mongoose");

app.use(express.static("public"));
app.set("view engine",'ejs');

app.use(parser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://localhost:27017/newnodejspratice");

const userSchema=new mongoose.Schema({
    email:String,
    password:String
})


const user=new mongoose.model("user",userSchema);

app.get("/",(req,res)=>{
    res.render("home");
})


app.get("/register",(req,res)=>{
    res.render("register");
})
app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/register",(req,res)=>{
    const newinputuser=new user({
        email:req.body.username,
        password:req.body.password,
    })
    newinputuser.save((err)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("secrets");
        }
    })
})


app.post("/login",(req,res)=>{
    user.findOne({email:req.body.username},(err,founduser)=>{
         if(err)
         {
             console.log(err);
         }
         else{
             if(founduser.password==req.body.password)
             {
                res.render("secrets")
             }
             else{
                 console.log("password does not match")
             }
         }
    })
    {
         
    }
})




app.listen(port,(req,res)=>{
   console.log(`your server has started at ${port}`);
})