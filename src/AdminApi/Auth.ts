import express, { response } from 'express';
import { connection } from '../Config/DBConfig';
const bcrypt = require('bcrypt');
const AdminAuthRoute = express.Router();
const saltRounds = 10;

AdminAuthRoute.post("/admin/admin-login",async (req,res)=>{
    let request = req.query;
    const findUser = 'SELECT * FROM admin WHERE email = ?'

    connection.query(findUser,[request.email,request.password],async(err,result)=>{
        if(err){
            res.send({
                status:false,
                message:"something went wrong",
                data:null
            })
        }
        console.log(result);
        let existUser  = result[0]; 
        if(existUser){
            
            let isCompared = await bcrypt.compare(request.password,existUser.password)
           
            if(isCompared === true){
                res.send({
                    status:true,
                    message:"User Logged in",
                    data:existUser
                })
            }else{
                res.send({
                    status:false,
                    message:"Incorrect password",
                    data:null
                })
            }
        }else{
            res.send({
                status:false,
                message:"user not found",
                data:null
            })
        }
        
    })
})
export default AdminAuthRoute;