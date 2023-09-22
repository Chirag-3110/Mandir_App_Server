"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HelperFunction_1 = require("../Middleware/HelperFunction");
const DBConfig_1 = require("../Config/DBConfig");
const EventController = express_1.default.Router();
/**
 * @api {get} /events/list Request User information
 * @apiName GetEvents
 * @apiGroup Events
 *
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
EventController.get("/events/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        let getEvents = "Select * FROM events";
        DBConfig_1.connection.query(getEvents, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            res.send({
                status: 200,
                message: "events get success fully",
                data: result[0]
            });
        }));
    }
    else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
}));
EventController.get("/events/details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        const request = req.query.id;
        let getEvents = "Select * FROM events WHERE id = ?";
        DBConfig_1.connection.query(getEvents, [request], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            res.send({
                status: 200,
                message: "events get success fully",
                data: result[0]
            });
        }));
    }
    else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
}));
EventController.get("/events/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        let request = req.body;
        let addEvent = "INSERT INTO events SET ?";
        DBConfig_1.connection.query(addEvent, request, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            res.send({
                status: 200,
                message: "events get success fully",
                data: result[0]
            });
        }));
    }
    else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
}));
exports.default = EventController;
//# sourceMappingURL=Events.js.map