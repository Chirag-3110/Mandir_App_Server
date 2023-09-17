import express, { response } from 'express';
import generateOTP from '../Middleware/HelperFunction';
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

    const findUser = 'SELECT COUNT(*) as count FROM users WHERE phone_number = ?'
    
    let existingUser = await connection.query(findUser,[request.phone])
    if (existingUser[0].count==0) {
        const createUser = 'INSERT INTO users (phone_number) VALUES (?)';
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
AuthRoute.post('/complete-profile', async (req, res) => {
    let request = req.body;

    const findUser = 'SELECT COUNT(*) as count FROM users WHERE phone_number = ?'
    
    let existingUser = await connection.query(findUser,[request.phone])
   
    if (existingUser) {
        let createProfile = await userModal.updateOne({ _id: user._id }, { $set: { isProfileCompleted: true, fullname: request.name, password: request.password, age: request.age, gotra: request.gotra, address: request.address } })
        if (createProfile) {
            res.json({
                status: 200,
                message: "Profile completed",
                data: { id: user.id, phone: user.phone, isProfileCompleted: true, name: request.name, age: request.age, gotra: request.gotra, address: request.address }

            })
        }
    } else {
        res.json({
            status: 400,
            message: "User not exists",
            data: {}

        })
    }


})

//login api
AuthRoute.post('/login', async (req, res) => {
    let request = req.body;

    let user = await userModal.findOne({ phone: request.phone });

    if (user) {
        if (request.password === user.password) {
            res.json({
                status: 200,
                message: "You have succressfuly logged in",
                data: user

            })
        } else {
            res.json({
                status: 400,
                message: "Invalid password",
                data: {}
            })
        }
    } else {
        res.json({
            status: 400,
            message: "User does not exist",
            data: {}
        })
    }
})

//approve user
AuthRoute.post('/approve-user', async (req, res) => {
    let request = req.body;

    let user = await userModal.findOne({ _id: request.id });

    if (user) {
        await userModal.updateOne({ _id: user._id }, { $set: { isApprove: true } })
        res.json({
            status: 200,
            message: "user approved",
            data: user
        })

    } else {
        res.json({
            status: 400,
            message: "User does not exist",
            data: null
        })
    }
})

//update user profile
AuthRoute.post('/update-profile', async (req, res) => {
    let request = req.body;

    userModal.updateOne({ _id: request.id }, {
        $set: request.body
    }).then((e) => {
        res.json({
            status: 200,
            message: "User updated successfully",
            data: {}

        })
    }).catch((e) => {
        res.json({
            status: 500,
            message: "User updated successfully",
            data: e

        })
    })
})

//set password
AuthRoute.post('/set-password', async (req, res) => {
    let request = req.body;

    userModal.updateOne({ phone: request.phone }, {
        $set: request.password
    }).then((e) => {
        res.json({
            status: 200,
            message: "Password set successfully",
            data: {}

        })
    }).catch((e) => {
        res.json({
            status: 500,
            message: "Error Occured",
            data: e

        })
    })
})


export default AuthRoute;