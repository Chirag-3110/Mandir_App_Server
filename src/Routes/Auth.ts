import express, { response } from 'express';
import {generateOTP} from '../Middleware/HelperFunction';
import { connection } from '../Config/DBConfig';
const AuthRoute = express.Router();
const jwt = require('jsonwebtoken');
//create user
AuthRoute.post('/createUser', async (req, res) => {
    let request = req.body;
    let otp = generateOTP(4)
    const jsonObject = {
        phone: request.phone,
        otp: otp
    }

    const findUser = 'SELECT COUNT(*) as count FROM user WHERE phone_number = ?'
    
    let existingUser = await connection.query(findUser,[request.phone])
    if (existingUser[0].count==0) {
        const createUser = 'INSERT INTO user (phone_number) VALUES (?)';
        connection.query(createUser,(err,result)=>{
            if (err) {
                res.json({
                    status: 500,
                    message: 'Internal Server Error',
                    data: {}
                })
              }
              res.json({
                status: 200,
                message: 'otp sent to your number',
                data: result
            })
        })
       
    } else {
        res.json({
            status: 303,
            message: 'User already exist',
            data: {}
        })
    }
})
//otp verification
AuthRoute.post('/verify-otp', async (req, res) => {
    let request = req.body;

    const findUser = 'SELECT COUNT(*) as count FROM users WHERE phone_number = ?'
    
    let existingUser = await connection.query(findUser,[request.phone])
   
    if (existingUser && request.otp === existingUser.otp) {
        const updateQuery = 'UPDATE users SET is_verify = ? WHERE phone = ?';

          connection.query(updateQuery,[false],(err,result)=>{
            if(err){
                res.json({
                    status: 400,
                    message: err,
                    data: {}
        
                })
            }
            res.json({
                status: 200,
                message: "Account Verified",
                data: {}

            })
          })
       
    } else {
        res.json({
            status: 400,
            message: "Invalid Otp",
            data: {}

        })
    }

})

//complete profile


export default AuthRoute;