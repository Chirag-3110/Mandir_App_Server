import express from 'express';
import { verifyToken } from '../Middleware/HelperFunction';
import { connection } from '../Config/DBConfig';
const EventController = express.Router();

/**
 * @api {get} /events/list Request User information
 * @apiName GetEvents
 * @apiGroup Events
 *
 * @apiParam {String} token User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

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

EventController.get("/events/add", async (req, res) => {
    const isVerified = verifyToken(req)
    if (isVerified === true) {
        let request = req.body;
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

export default EventController;