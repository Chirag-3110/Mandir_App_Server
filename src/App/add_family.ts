import { connection } from "../Config/DBConfig";
import { verifyToken } from "../Middleware/HelperFunction";

const express = require('express')

const AddFamily = express.Router()

AddFamily.post("/add-member",async (req,res)=>{
    const isVerified = verifyToken(req)
    console.log(req.body,"req.body add");
    
    if (isVerified===true) {
        const {  id , members } = req.body;
        let userIds = []
        Promise.all(
            members.map((member)=>{
                const { full_name , email , phone , gender , occupation , age , address , married } = member
               return new Promise((resolve,reject)=>{
                connection.query("SELECT * FROM users WHERE email = ? OR phone = ?",[email,phone],(err,result)=>{
                    if(err){
                       reject(err)
                    }
            
                    const userExist = result
                    if(userExist){
                        userIds.push(userExist.id)
                       connection.query('UPDATE users SET members = ? WHERE id = ?',[JSON.stringify(userIds),id],(err,res)=>{
                        if(err){
                            reject(err)
                        }
                        resolve(res)
                       })
                    }else{
                        connection.query('INSERT INTO users SET ?',[full_name , email , phone , gender , occupation , age , address , married],(err,res)=>{
                            if(err){
                                reject(err)
                            }
                            connection.query('SELECT * FROM users WHERE email = ?',[email],(err,res)=>{
                                if(err){
                                    reject(err)
                                }
                                if(res){
                                    userIds.push(res.id)
                                    connection.query("UPDATE users SET members = ? WHERE id = ?",[JSON.stringify(userIds),id],(err,res)=>{
                                        if(err){
                                            reject(err)
                                        }
                                        resolve(res)
                                    });
                                }
                            });
                        });
                        
        
                    }
                })
               })
            })
        ).then((resolve)=>{
            res.send({
                status: 200,
                message: 'Members Added', data: resolve
            });
        }).catch((err)=>{
            res.send({
                status: 500,
                message: 'Something went wrong', data: err
            });
        })
    } else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
    
})



export default AddFamily