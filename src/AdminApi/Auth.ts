import express, { response } from 'express';
import { connection } from '../Config/DBConfig';
const bcrypt = require('bcrypt');
const AdminAuthRoute = express.Router();
const saltRounds = 10;

AdminAuthRoute.post("/admin/admin-login",async (req,res)=>{
    let request = req.body;
    console.log(request,"body");
    
    const findUser = 'SELECT * FROM admin WHERE email = ?'

    connection.query(findUser,[request.email],async(err,result)=>{
        if(err){
            res.send({
                status:503,
                message:"internal server error",
                data:null
            })
        }
        let existUser  = result[0]; 
        if(existUser){
            
            let isCompared = await bcrypt.compare(request.password,existUser.password)
           
            if(isCompared === true){
                res.send({
                    status:200,
                    message:"User Logged in",
                    data:existUser
                })
            }else{
                res.send({
                    status:401,
                    message:"Incorrect password",
                    data:null
                })
            }
        }else{
            res.send({
                status:404,
                message:"user not found",
                data:null
            })
        }
        
    })
})
export default AdminAuthRoute;