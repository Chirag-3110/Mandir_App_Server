import express, { response } from 'express';
import { connection } from '../Config/DBConfig';
import { verifyToken } from '../Middleware/HelperFunction';
const XLSX = require('xlsx');
const multer = require('multer');
const UserController = express.Router();
const storage = multer.memoryStorage(); // Store files in memory for parsing.
const upload = multer({ storage: storage }).single('file'); // 'file' should match the 'name' attribute


UserController.get("/get-users", (req, res) => {
    
   const isVerified = verifyToken(req)
   console.log(isVerified);
   
   if(isVerified===true){
    const page = 1;
    const pageSize = 10;

    const offset = (page - 1) * pageSize;


    const query = `SELECT * FROM users LIMIT ? OFFSET ?`;
    const values = [pageSize, offset];

    connection.query(query, values, (err, result) => {
        if (err) {
            res.send({
                status: false,
                message: "Something went wrong",
                data: err
            })
        }

        res.send({
            status: true,
            message: "Users get successully",
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
   if(isVerified===true){
    let request = req.body;
    console.log(request, "body");



    if(request){
        const getUser = "SELECT * FROM users WHERE phone = ? OR email = ?";

    connection.query(getUser, [request.phone,,request.email], async (err, result) => {
        if (err) {
            res.send({
                status: 503,
                message: "internal server error",
                data: null
            })
        }
        let existUser = result[0];
        if (existUser) {
            res.send({
                status: 404,
                message: "phone or email already exist",
                data: null
            })

        } else {
            const setUser = "INSERT INTO users SET ?";
            request.created_at = new Date().toUTCString()
            connection.query(setUser, request, async (err, result) => {
                console.log(err,"error is");
                if (err) res.send({
                    status: 500,
                    message: "Internal server error",
                    data: null
                })

                const query = "SELECT * FROM users WHERE phone = ?";
             connection.query(query,[request.phone],async (err, result)=>{
                if (err) {
                    console.log(err);
                    
                    res.send({
                        status: 500,
                        message: "Internal server error",
                        data: null
                    })
                }
            
                
                res.send({
                    status: 201,
                    message: "user created",
                    data: result[0]
                })
             });
                
            })

        }

    })
    }else{
        res.send({
            status: 404,
            message: "request is empty",
            data: null
        })
    }

   }else{
    res.send({
        status: 401,
        message: "Unauthenticated",
        data: null
    })
   }
})


export default UserController;