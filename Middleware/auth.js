const jwt = require("jsonwebtoken");
const {JWT_AUTH} = require("../config")
function auth(req,res,next){
    const token = req.headers.token;
    const result = jwt.verify(token,JWT_AUTH);
    if(result){
        console.log("Admin is Signedin");
        req.userId = token.id
        next();
    }else{
        res.json({
            message: "Invalid Token"
        })
    }
}
module.exports=auth
// {
//    "title":"title",
//     "description":"description",
//     "price":1234567
// }