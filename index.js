const express = require('express');
const app = express();
const {userRouter} = require('./Routes/user')
require('dotenv').config()
const mongoose  = require('mongoose');
const {courseRouter} = require('./Routes/Courses')
const {adminRouter} = require('./Routes/Admin');
app.use(express.json());
app.use('/user',userRouter);
app.use('/courses',courseRouter);
app.use('/admin',adminRouter);
async function main(){
   await mongoose.connect(process.env.MONGO_URL);
   console.log("HI");
    app.listen(3000);
}
main();

