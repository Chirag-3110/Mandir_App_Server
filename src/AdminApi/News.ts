const express = require('express')
import { verifyToken } from '../Middleware/HelperFunction';
import { connection } from '../Config/DBConfig';
const NewsController = express.Router()

NewsController.get("/news/list", async (req, res) => {
    const isVerified = verifyToken(req)
    if (isVerified === true) {
        let getEvents = "Select * FROM news";
        connection.query(getEvents, async (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            }
            res.send({
                status: 200,
                message: "news get success fully",
                data: result[0]
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

NewsController.get("/news/details", async (req, res) => {
    const isVerified = verifyToken(req)
    if (isVerified === true) {
        const request= req.query.id;
        let getEvents = "Select * FROM news WHERE id = ?";
        connection.query(getEvents,[request], async (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            }
            res.send({
                status: 200,
                message: "news get successfully",
                data: result[0]
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



NewsController.get("/news/add", async (req, res) => {
    const isVerified = verifyToken(req)
    if (isVerified === true) {
        let request = req.body;
        let addEvent = "INSERT INTO news SET ?";
        connection.query(addEvent,request, async (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                })
            }
            res.send({
                status: 200,
                message: "news get success fully",
                data: result[0]
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

NewsController.post("/news/change-status",(req,res)=>{
    const isVerified = verifyToken(req)
    if(isVerified==true){
        let request = req.body;
        const updateQuery = 'UPDATE news SET is_active = ? WHERE id = ?'
        const getEvent = 'Select * FROM news WHERE id = ?'
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

NewsController.post("/news/delete-status",(req,res)=>{
    const isVerified = verifyToken(req)
    if(isVerified==true){
        let request = req.body;
        const updateQuery = 'UPDATE news SET is_delete = ? WHERE id = ?'
        const getEvent = 'Select * FROM news WHERE id = ?'
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
                    message: "Event deleted",
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
export default NewsController