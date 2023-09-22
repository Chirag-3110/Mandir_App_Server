import express, { response } from 'express';
import { connection } from '../Config/DBConfig';
const bcrypt = require('bcrypt');
const AdminAuthRoute = express.Router();
const env = require('dotenv')
env.config()
const jwt = require('jsonwebtoken');

AdminAuthRoute.post("/admin/admin-login", async (req, res) => {
    let request = req.body;
    console.log(request, "body");

    const findUser = 'SELECT * FROM admin WHERE email = ?'

    connection.query(findUser, [request.email], async (err, result) => {
        if (err) {
            res.send({
                status: 503,
                message: "internal server error",
                data: err
            })
        }
        
        
        let existUser = result[0];
        if (existUser) {

            let isCompared = await bcrypt.compare(request.password, existUser.password)

            if (isCompared === true) {
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let data = {
                    
                    userId: existUser.id,
                    email:  existUser.email
                }

                const token = jwt.sign(data, jwtSecretKey);
                console.log(token);
                
                
                res.send({
                    status: 200,
                    message: "User Logged in",
                    data: token
                })
            } else {
                res.send({
                    status: 401,
                    message: "Incorrect password",
                    data: null
                })
            }
        } else {
            res.send({
                status: 404,
                message: "user not found",
                data: null
            })
        }

    })
})
export default AdminAuthRoute;