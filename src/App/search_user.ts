import { connection } from "../Config/DBConfig"
import { verifyToken } from "../Middleware/HelperFunction"

const express = require('express')

const Searh = express.Router()
Searh.post("/user/search",(req,res)=>{
    const isVerified = verifyToken(req)
    if(isVerified === true){
        const { query } = req.body
        const sql = `SELECT * FROM users WHERE name LIKE ?`;

        connection.query(sql,[name],(err,result)=>{
            if(err){
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })

            }
            res.send({
                status: 200,
                message: "Users list",
                data: result
            })
        })
    }else{
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
})

export default Searh