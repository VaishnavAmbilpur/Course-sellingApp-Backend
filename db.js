
const mongoose  = require('mongoose');

const Schema = mongoose.Schema;
const Objectid  = mongoose.Types.ObjectId;


const userSchema = new Schema({
   email:{type:String , unique:true},
   password : String,
   name : String
})
const AdminSchema = new Schema({
   email:{type:String , unique:true},
   password : String,
   name : String
})
const CourseSchema = new Schema({
    title : {type:String , unique:true},
    description : String,
    price : Number,
    createrId : Objectid,

})
const PurchaseSchema = new Schema({
   courseId: Objectid,
   userId : Objectid
})

const userModel = mongoose.model("user",userSchema);
const AdminModel = mongoose.model("Admin",AdminSchema);
const CourseModel = mongoose.model("Course",CourseSchema);
const PurchaseModel = mongoose.model("Purchase",PurchaseSchema);

module.exports={
    userModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}