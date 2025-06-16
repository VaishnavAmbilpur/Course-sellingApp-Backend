const jwt = require("jsonwebtoken");
const {JWT_USER}= require("../config")
function userm(req,res,next){
    const token = req.headers.token;
    const result = jwt.verify(token,JWT_USER);
    if(result){
        console.log("User is Signedin")
        req.userId = token.id
        next();
    }else{
        res.json({
            message: "Invalid Token"
        })
    }
}
module.exports=userm
