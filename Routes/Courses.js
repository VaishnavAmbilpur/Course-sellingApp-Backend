const {Router} = require('express');
const courseRouter = Router();
const {PurchaseModel} = require("../db")
require('dotenv').config()
const {CourseModel} = require("../db")
const userm = require("../Middleware/userm")
    courseRouter.get('/preview',async(req,res)=>{
         const courses = await CourseModel.find({});

        res.json({
            courses
        })
    })
    courseRouter.post('/purchase',userm,async(req,res)=>{
        const userId = req.userId;
        const courseId = req.body.courseId;
        await PurchaseModel.create({
            courseId : courseId,
            userId : userId
        })
        res.json({
                 message: "You have successfully bought the course"
        })
    })

module.exports = {
    courseRouter:courseRouter
}