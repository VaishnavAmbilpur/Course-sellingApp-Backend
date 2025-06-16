require('dotenv').config();
const JWT_AUTH = process.env.JWT_AUTH;
const JWT_USER = process.env.JWT_USER;
module.exports={
    JWT_AUTH,
    JWT_USER
}