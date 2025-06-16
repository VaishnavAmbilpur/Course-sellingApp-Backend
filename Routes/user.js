
const { Router }= require('express')
const userRouter = Router();
const {userModel} = require("../db")
const jwt = require('jsonwebtoken')
const userm = require("../Middleware/userm");
const { JWT_USER } = require('../config');
require('dotenv').config()
const bcrypt = require('bcrypt');
const {PurchaseModel} = require("../db")
userRouter.post('/signup',async(req,res)=>{
            const email = req.body.email;
            const password = req.body.password;
            const name = req.body.name;
            const vpassword = await bcrypt.hash(password,10);
            await userModel.create({
                email:email,
                password:vpassword,
                name:name
            })
            res.json({
                message:"The User is Signed up"
            })
})
userRouter.post('/login',async(req,res)=>{
            const email = req.body.email;
            const password = req.body.password;
            const name = req.body.name;
            const result = await userModel.findOne({
                email:email,
                name:name
            })
            if(result){
                if(bcrypt.compare(result.password,password)){
                    const token = jwt.sign({
                        id: result._id
                    },JWT_USER);
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
userRouter.get('/purchases', userm, async (req, res) => {
        const userId = req.userId;
        const purchases = await PurchaseModel.findOne({
            userId: userId
        });
        res.json({
            purchases: purchases
        });
});

module.exports = {
    userRouter : userRouter
}