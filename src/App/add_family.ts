import { connection } from "../Config/DBConfig";

const express = require('express')

const AddFamily = express.Router()

AddFamily.post("/add-member",async (req,res)=>{
    const {  id , members } = req.body;
    for (let index = 0; index < members.length; index++) {
        const { full_name , email , phone , gender , occupation , age , address , married } = members[index];
        connection.query("SELECT * FROM users WHERE email = ? OR phone = ?",[email,phone],(err,result)=>{
            if(err){
               res.send({
                status:500,
                message:"Internal Server error",
                data:null
               })
            }
    
            const userExist = result
            if(userExist){
               
            }else{
                
            }
        })
        
    }
})



export default AddFamily