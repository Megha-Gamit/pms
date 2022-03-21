const express = require("express");
const router = express.Router();
const userModel= require("../modules/users")
let bcrypt = require("bcryptjs");

//Get Home Page

function checkemail(req,res,next){
    const email = req.body.email;
    const checkexitemail = userModel.findOne({email:email})
    checkexitemail.exec((err,data)=>{
        if(err) throw err;

        if(data){

          return  res.render("signup",{title:"Password Management System", msg:"Email Already Exit"});

        }

        next();

    })

}


function checkusername(req,res,next){
    const uname = req.body.uname;
    const checkexitemail = userModel.findOne({username:uname})
    checkexitemail.exec((err,data)=>{
        if(err) throw err;

        if(data){

          return  res.render("signup",{title:"Password Management System", msg:"User Name Already Exit"});

        }

        next();

    })

}

router.get("/",(req,res,next)=>{
    res.render("index",{title:"Password Management System"});
});

router.get("/signup",(req,res,next)=>{
    res.render("signup",{title:"Password Management System", msg:""});
});

router.post("/signup", checkusername,checkemail, (req,res,next)=>{

    const username = req.body.uname;
    const email = req.body.email;
    let password = req.body.password;
    const confpassword= req.body.confpassword;

    if(password != confpassword){


        res.render("signup",{title:"Password Management System", msg:"Password Not Match"});

        
    }else{

    password = bcrypt.hashSync(req.body.password,10);

    const userdetails = new userModel({
        username:username,
        email:email,
        password:password
    
    })

    userdetails.save((err,doc)=>{
        if(err) throw err;


        res.render("signup",{title:"Password Management System", msg:"User Registerd Successfully"});

    });
     }


});

router.get("/passwordCategory",(req,res,next)=>{
    res.render("password_category",{title:"Password Management System"});
});

router.get("/add-new-category",(req,res,next)=>{
    res.render("addNewCategory",{title:"Password Management System"});
});

router.get("/add-new-passwod",(req,res,next)=>{
    res.render("add-new-password",{title:"Password Management System"});
});

router.get("/view-all-passwod",(req,res,next)=>{
    res.render("view-all-password",{title:"Password Management System"});
});



module.exports= router;