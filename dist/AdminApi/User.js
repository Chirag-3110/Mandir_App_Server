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
const DBConfig_1 = require("../Config/DBConfig");
const HelperFunction_1 = require("../Middleware/HelperFunction");
const XLSX = require('xlsx');
const multer = require('multer');
const UserController = express_1.default.Router();
const storage = multer.memoryStorage(); // Store files in memory for parsing.
const upload = multer({ storage: storage }).single('file'); // 'file' should match the 'name' attribute
UserController.get("/get-users", (req, res) => {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    console.log(isVerified);
    if (isVerified === true) {
        const page = 1;
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        const query = `SELECT id,full_name,email,phone,gotra,address,occupation,age,gender,postal_address FROM users LIMIT ? OFFSET ?`;
        const values = [pageSize, offset];
        DBConfig_1.connection.query(query, values, (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            res.send({
                status: 200,
                message: "Users get successully",
                data: result
            });
        });
    }
    else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
});
UserController.post("/get-file", upload, (req, res) => {
    console.log(req.file);
    const workbook = XLSX.read(req.file.buffer);
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
});
UserController.post("/add-user", (req, res) => {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        let request = req.body;
        console.log(request, "body");
        if (request) {
            const getUser = "SELECT * FROM users WHERE phone = ? OR email = ?";
            DBConfig_1.connection.query(getUser, [request.phone, , request.email], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.send({
                        status: 503,
                        message: "internal server error",
                        data: err
                    });
                }
                let existUser = result[0];
                if (existUser) {
                    res.send({
                        status: 404,
                        message: "phone or email already exist",
                        data: err
                    });
                }
                else {
                    const setUser = "INSERT INTO users SET ?";
                    request.created_at = new Date().toUTCString();
                    request.password = (0, HelperFunction_1.generateRendomString)();
                    console.log(request);
                    DBConfig_1.connection.query(setUser, request, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                        console.log(err, "error is");
                        if (err)
                            res.send({
                                status: 500,
                                message: "Internal server error",
                                data: null
                            });
                        const query = "SELECT id,full_name,email,phone,gotra,address,occupation,age,gender,postal_address FROM users WHERE phone = ?";
                        DBConfig_1.connection.query(query, [request.phone], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                            if (err) {
                                console.log(err);
                                res.send({
                                    status: 500,
                                    message: "Internal server error",
                                    data: err
                                });
                            }
                            res.send({
                                status: 201,
                                message: "user created",
                                data: result[0]
                            });
                        }));
                    }));
                }
            }));
        }
        else {
            res.send({
                status: 404,
                message: "request is empty",
                data: null
            });
        }
    }
    else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
});
exports.default = UserController;
//# sourceMappingURL=User.js.map