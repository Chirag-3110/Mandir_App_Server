import express, { response } from 'express';
import { connection } from '../Config/DBConfig';
const XLSX = require('xlsx');
const multer = require('multer');
const UserController = express.Router();
const storage = multer.memoryStorage(); // Store files in memory for parsing.
const upload = multer({ storage: storage }).single('file'); // 'file' should match the 'name' attribute


UserController.get("/get-users", (req, res) => {
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

    let request = req.body;
    console.log(request, "body");



    const query = `SELECT * FROM users WHERE phone = ?`;

    connection.query(query, [request.phone], async (err, result) => {
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
                message: "user already exist",
                data: null
            })

        } else {
            const query = "INSERT INTO admin SET ?";

            connection.query(query, request, async (err, result) => {
                if (err) res.send({
                    status: 500,
                    message: "Internal server error",
                    data: null
                })

                const query = "SELECT * FROM users WHERE phone = ?";
               const resultData = await connection.query(query,[request.phone]);
                res.send({
                    status: 200,
                    message: "user added",
                    data: resultData[0]
                })
            })

        }

    })

})


export default UserController;