const {Router} = require('express');
const express = require('express')
const app = express();
require('dotenv').config()
const jwt = require("jsonwebtoken")
const adminRouter = Router();
const z = require('zod');
const {JWT_AUTH} = require("../config")
const bcrypt = require('bcrypt');
const {AdminModel} = require('../db')
const auth = require("../Middleware/auth");
const { Admin } = require('mongodb');
const {CourseModel} = require('../db')
adminRouter.post('/signup',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const vpassword = await bcrypt.hash(password,10);
    await AdminModel.create({
        email:email,
        password:vpassword,
        name:name
    })
    res.json({
        message:"The Admin is Signed up"
    })
})
adminRouter.post('/login',async (req,res)=>{
     const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const result = await AdminModel.findOne({
        email:email,
        name:name
    })
    console.log(JWT_AUTH);
    if(result){
        if(bcrypt.compare(result.password,password)){
           const token = jwt.sign({
            id: result._id
           },JWT_AUTH);
           res.json({
             message:token
           })
        }else{
            res.json({message:"Wrong Crendentials"});
        }
    }else{
         res.json({message:"Wrong Crendentials"});
    }
})
adminRouter.post('/course',auth,async(req,res)=>{
     const userid = req.userId;
     const { title, description, price } = req.body;

     const course = await CourseModel.create({
        title:title,
        description:description,
        price:price,
        createrId : userid
     })
     res.json({
        message:"You have created A Course",
        course: course._id
     })

})
adminRouter.put('/course',auth,async(req,res)=>{
     const userid = req.userId;
     const { title, description, price ,courseId} = req.body;

     const course = await CourseModel.updateOne({
        _id : courseId,
        createrId : userid
     },{
        title: title, 
        description: description, 
        price:price
     })

     res.json({
        message:"You have updated A Course",
        courseId:courseId,
        course : course
     })
})

adminRouter.put('/course/bulk',auth,async(req,res)=>{
    const userid = req.userId;
    const courses = await CourseModel.find({
        createrId : userid
    });

    res.json({
        message: "This is are all your courses",
        courses
    })
})
module.exports = {
    adminRouter: adminRouter
}