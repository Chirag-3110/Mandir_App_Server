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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const HelperFunction_1 = require("../Middleware/HelperFunction");
const DBConfig_1 = require("../Config/DBConfig");
const NewsController = express.Router();
NewsController.get("/news/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        let getEvents = "Select * FROM news";
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
                message: "news get success fully",
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
NewsController.get("/news/details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        const request = req.query.id;
        let getEvents = "Select * FROM news WHERE id = ?";
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
                message: "news get successfully",
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
NewsController.get("/news/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        let request = req.body;
        let addEvent = "INSERT INTO news SET ?";
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
                message: "news get success fully",
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
NewsController.post("/news/change-status", (req, res) => {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified == true) {
        let request = req.body;
        const updateQuery = 'UPDATE news SET is_active = ? WHERE id = ?';
        const getEvent = 'Select * FROM news WHERE id = ?';
        DBConfig_1.connection.query(getEvent, [request.id], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            const eventData = result[0];
            DBConfig_1.connection.query(updateQuery, [!eventData.is_active, request.id], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.send({
                        status: 500,
                        message: "Internal server error",
                        data: err
                    });
                }
                res.send({
                    status: 200,
                    message: "Status Updated",
                    data: null
                });
            }));
        }));
    }
    else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
});
NewsController.post("/news/delete-status", (req, res) => {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified == true) {
        let request = req.body;
        const updateQuery = 'UPDATE news SET is_delete = ? WHERE id = ?';
        const getEvent = 'Select * FROM news WHERE id = ?';
        DBConfig_1.connection.query(getEvent, [request.id], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            const eventData = result[0];
            DBConfig_1.connection.query(updateQuery, [!eventData.is_delete, request.id], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.send({
                        status: 500,
                        message: "Internal server error",
                        data: err
                    });
                }
                res.send({
                    status: 200,
                    message: "Event deleted",
                    data: null
                });
            }));
        }));
    }
    else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
});
exports.default = NewsController;
//# sourceMappingURL=News.js.map