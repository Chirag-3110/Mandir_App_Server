import express, { response } from 'express';
import { connection } from '../Config/DBConfig';
import { generateRendomString,  verifyToken } from '../Middleware/HelperFunction';
import { sendMail } from '../Middleware/smtp_mail';
const XLSX = require('xlsx');
const multer = require('multer');
const UserController = express.Router();
const storage = multer.memoryStorage(); // Store files in memory for parsing.
const upload = multer({ storage: storage }).single('file'); // 'file' should match the 'name' attribute
const Joi = require('joi');

/**
* @api {get} /user Request User information
* @apiName GetUser
* @apiGroup User
*/
UserController.get("/get-users", (req, res) => {

    const isVerified = verifyToken(req)
    console.log(isVerified);

    if (isVerified === true) {
       
        const page = 1;
        const pageSize = 10;

        const offset = (page - 1) * pageSize;


        const query = `SELECT id,full_name,email,phone,gotra,address,occupation,age,gender,postal_address,is_active,is_delete,created_at FROM users LIMIT ? OFFSET ?`;
        const values = [pageSize, offset];

        connection.query(query, values, (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            }

            res.send({
                status: 200,
                message: "Users get successully",
                data: result
            })
        })
    } else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }

})

UserController.post("/get-file", upload, (req, res) => {
    console.log(req.file);

    const workbook = XLSX.read(req.file.buffer)
    if (!req) {
        return res.status(400).send('No file uploaded.');
    }
    return res.status(400).send('No file uploaded.');

    // connection.query(query, values, (err, result) => {
    //     if (err) {
    //         res.send({
    //             status: false,
    //             message: "Something went wrong",
    //             data: err
    //         })
    //     }

    //     res.send({
    //         status: true,
    //         message: "Users get successully",
    //         data: result
    //     })
    // })

})

UserController.post("/add-user", (req, res) => {
    const isVerified = verifyToken(req)
    if (isVerified === true) {
        let request = req.body;
        console.log(request, "body");

        if (request) {
            const getUser = "SELECT * FROM users WHERE phone = ? OR email = ?";

            connection.query(getUser, [request.phone,request.email], async (err, result) => {
                if (err) {
                    res.send({
                        status: 503,
                        message: "internal server error",
                        data: err
                    })
                }
                let existUser = result[0];
                if (existUser) {
                    res.send({
                        status: 404,
                        message: "phone or email already exist",
                        data: err
                    })

                } else {
                    const setUser = "INSERT INTO users SET ?";
                    request.created_at = new Date().toUTCString()
                    request.password = generateRendomString(),

                    console.log(request);

                    
                    
                    connection.query(setUser, request, async (err, result) => {
                        console.log(err, "error is");
                        if (err) res.send({
                            status: 500,
                            message: "Internal server error",
                            data: err
                        })

                        const query = "SELECT * FROM users WHERE phone = ?";
                        connection.query(query, [request.phone], async (err, result) => {
                            if (err) {
                                console.log(err);

                                res.send({
                                    status: 500,
                                    message: "Internal server error",
                                    data: err
                                })
                            }
                            sendMail(result[0],"Welcome Mail");

                            res.send({
                                status: 201,
                                message: "user created",
                                data: result[0].id
                            })
                        });

                    })

                }

            })
        } else {
            res.send({
                status: 404,
                message: "request is empty",
                data: null
            })
        }

    } else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        })
    }
})

UserController.post("/user-status",(req,res)=>{
    const isVerified = verifyToken(req)
    if(isVerified==true){
        let request = req.body;
        const updateQuery = 'UPDATE users SET is_active = ? WHERE id = ?'
        const getEvent = 'Select * FROM users WHERE id = ?'
        connection.query(getEvent,[request.id], async (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            }
            const eventData = result[0];
            connection.query(updateQuery,[!eventData.is_active,request.id], async (err, result) => {
                if (err) {
                    res.send({
                        status: 500,
                        message: "Internal server error",
                        data: err
                    })
                }
                res.send({
                    status: 200,
                    message: "Status Updated",
                    data: null
                })
                
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

UserController.post("/delete-user",(req,res)=>{
    const isVerified = verifyToken(req)
    if(isVerified==true){
        let request = req.body;
        const updateQuery = 'UPDATE users SET is_delete = ? WHERE id = ?'
        const getEvent = 'Select * FROM users WHERE id = ?'
        connection.query(getEvent,[request.id], async (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            }
            const eventData = result[0];
            connection.query(updateQuery,[!eventData.is_delete,request.id], async (err, result) => {
                if (err) {
                    res.send({
                        status: 500,
                        message: "Internal server error",
                        data: err
                    })
                }
                res.send({
                    status: 200,
                    message: "User deleted",
                    data: null
                })
                
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

export default UserController;