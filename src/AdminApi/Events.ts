import express from 'express';
import { verifyToken } from '../Middleware/HelperFunction';
import { connection } from '../Config/DBConfig';
import { upload } from '../Middleware/image_upload';
const EventController = express.Router();


EventController.get("/events/list", async (req, res) => {
    const isVerified = verifyToken(req)
    if (isVerified === true) {
        let getEvents = "Select * FROM events";
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
                message: "events get success fully",
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

EventController.post("/events/details", async (req, res) => {
    const isVerified = verifyToken(req)
    if (isVerified === true) {
        const request= req.body.id;
        let getEvents = "Select * FROM events WHERE id = ?";
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
                message: "events get success fully",
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



EventController.post("/events/add", upload.single("file"), async (req, res) => {
    const isVerified = verifyToken(req)
    if (isVerified === true) {
        console.log(req.file);
        let filePath = req.file.path;
        let request = req.body;
        request.image = filePath;
        request.created_at=new Date()
        console.log(request);
       
        
        
        let addEvent = "INSERT INTO events SET ?";
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
                message: "events get success fully",
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

EventController.post("/events/change-status",(req,res)=>{
    const isVerified = verifyToken(req)
    if(isVerified==true){
        let request = req.body;
        const updateQuery = 'UPDATE events SET is_active = ? WHERE id = ?'
        const getEvent = 'Select * FROM events WHERE id = ?'
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

EventController.post("/events/delete-status",(req,res)=>{
    const isVerified = verifyToken(req)
    if(isVerified==true){
        let request = req.body;
        const updateQuery = 'UPDATE events SET is_delete = ? WHERE id = ?'
        const getEvent = 'Select * FROM events WHERE id = ?'
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
export default EventController;