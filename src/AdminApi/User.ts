import express, { response } from 'express';
import { connection } from '../Config/DBConfig';
const UserController = express.Router();

UserController.get("/get-users", (req, res) => {
    const page = 1;
    const pageSize = 10;

    const offset = (page - 1) * pageSize;


    const query = `SELECT * FROM user LIMIT ? OFFSET ?`;
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

export default UserController;