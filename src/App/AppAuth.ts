import { connection } from "../Config/DBConfig"
import { generateOTP, verifyToken } from "../Middleware/HelperFunction"
const jwt = require('jsonwebtoken');

const express = require('express')

const AppAuth = express.Router()

const env = require('dotenv')
env.config()

AppAuth.post('/app/send-otp', async (req, res) => {

    const { phone } = req.body;

    const countQuery = `SELECT * FROM users WHERE phone = ?`

    connection.query(countQuery, [phone], (err, result) => {
        if (err) {
            res.send({
                status: 500,
                message: "Internal Server Error",
                data: err
            })
        }
        let existUser = result[0];
        if (existUser) {
            if (existUser.is_active == 1) {
                if (existUser.is_delete == 0) {
                    const otp = generateOTP(4);
                    const updateUser = `UPDATE users SET otp = ${otp} WHERE phone = ?`
                    connection.query(updateUser, [phone], (err, result) => {
                        if (err) {
                            res.send({
                                status: 500,
                                message: "Internal Server Error",
                                data: null
                            })
                        }
                        res.send({
                            status: 200,
                            message: "Otp Sent Successfully",
                            otp: otp,
                        })
                    })
                }else{
                    res.send({
                        status: 404,
                        message: "Account Deleted",
                        data: null
                    })
                }
            }else{
                res.send({
                    status: 404,
                    message: "Account is deactivated,contact admin",
                    data: null
                })
            }
        } else {
            res.send({
                status: 404,
                message: "No User Found",
                data: null
            })
        }


    })

})


AppAuth.post("/app/verify_otp", async (req, res) => {
    const { phone, otp } = req.body;

    const countQuery = `SELECT * FROM users WHERE phone = ?`
    connection.query(countQuery, [phone], (err, result) => {
        if (err) {
            res.send({
                status: 500,
                message: "Internal Server Error",
                data: err
            })
        }
        let existUser = result[0];
        if (existUser.otp == otp) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                userId: existUser.id,
                email: existUser.phone
            }

            const token = jwt.sign(data, jwtSecretKey);
            
            res.send({
                status: 200,
                message: "OTP verified successfully",
                data: existUser,
                token:token
            })
        } else {
            res.send({
                status: 404,
                message: "Invalid OTP",
                data: null
            })
        }
    })

})


AppAuth.post("/app/complete-profile", (req, res) => {

    const isVerified = verifyToken(req)
    if (isVerified === true) {
        const { id, full_name, email, gender, occupation, age, gotra, address, } = req.body;


        const updateQuery = 'UPDATE users SET full_name = ?,email = ?,gender = ?,occupation = ?,age = ?,gotra = ?,address = ?,isProfileCompleted = ? WHERE id = ?'
        connection.query(updateQuery, [full_name, email, gender, occupation, age, gotra, address,1, id], async (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            } else {
                connection.query('Select * from users WHERE id = ?',[id],(err,result)=>{
                    if (err) {
                        res.send({
                            status: 500,
                            message: "Internal server error",
                            data: err
                        })
                    }else{
                        let existUser = result[0];
                        res.send({
                            status: 200,
                            message: "User Data",
                            data: existUser
                        })
                    }
                })

                
            }
        })
    } else {
        res.send({
            status: 401,
            message: "UnAppAuthenticated",
            data: null
        })
    }


})



export default AppAuth