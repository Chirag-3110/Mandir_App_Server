import { connection } from "../Config/DBConfig"
import { verifyToken } from "../Middleware/HelperFunction"

const express = require('express')

const Searh = express.Router()
Searh.post("/user/search",(req,res)=>{
    const isVerified = verifyToken(req)
    if(isVerified === true){
        const { query } = req.body
        const sql = `SELECT * FROM users WHERE full_name LIKE ? OR phone LIKE ? OR gotra LIKE ? OR occupation LIKE ?`;

        connection.query(sql,[`%${query}%`,`%${query}%`,`%${query}%`,`%${query}%`],(err,result)=>{
            if(err){
                res.json({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })

            }else{
                res.json({
                    status: 200,
                    message: "Users List",
                    data: result
                })
            }
            
        })
    }else{
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
})

export default Searh