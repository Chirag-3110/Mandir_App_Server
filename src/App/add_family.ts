import { connection } from "../Config/DBConfig";

const express = require('express')

const AddFamily = express.Router()

AddFamily.post("/add-member",async (req,res)=>{
    const {  id , members } = req.body;
    for (let index = 0; index < members.length; index++) {
        const { full_name , email , phone , gender , occupation , age , address , married } = members[index];
        connection.query("SELECT * FROM users WHERE email = ? OR phone = ?",[email,phone],(err,result)=>{
            if(err){
                console.log(err);
                
            }
    
            const userExist = result
            if(userExist){
                console.log(userExist);
            }else{
                console.log(userExist);
                return {
                    status:false,
                    data:null
                }
            }
        })
        
    }
})

function checkUser(email,phone){
    connection.query("SELECT * FROM users WHERE email = ? OR phone = ?",[email,phone],(err,result)=>{
        if(err){
            return {
                status:false,
                data:null
            }
        }

        const userExist = result
        if(userExist){
            return {
                status:true,
                data:userExist
            }
        }else{
            return {
                status:false,
                data:null
            }
        }
    })
}


export default AddFamily