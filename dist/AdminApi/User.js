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
const XLSX = require('xlsx');
const multer = require('multer');
const UserController = express_1.default.Router();
const storage = multer.memoryStorage(); // Store files in memory for parsing.
const upload = multer({ storage: storage }).single('file'); // 'file' should match the 'name' attribute
UserController.get("/get-users", (req, res) => {
    const page = 1;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    const query = `SELECT * FROM users LIMIT ? OFFSET ?`;
    const values = [pageSize, offset];
    DBConfig_1.connection.query(query, values, (err, result) => {
        if (err) {
            res.send({
                status: false,
                message: "Something went wrong",
                data: err
            });
        }
        res.send({
            status: true,
            message: "Users get successully",
            data: result
        });
    });
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
    let request = req.body;
    console.log(request, "body");
    const getUser = `SELECT * FROM users WHERE phone = ?`;
    DBConfig_1.connection.query(getUser, [request.phone], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.send({
                status: 503,
                message: "internal server error",
                data: null
            });
        }
        let existUser = result[0];
        if (existUser) {
            res.send({
                status: 404,
                message: "user already exist",
                data: null
            });
        }
        else {
            const setUser = "INSERT INTO users SET ?";
            DBConfig_1.connection.query(setUser, request, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    res.send({
                        status: 500,
                        message: "Internal server error",
                        data: null
                    });
                const query = "SELECT * FROM users WHERE phone = ?";
                const resultData = yield DBConfig_1.connection.query(query, [request.phone]);
                res.send({
                    status: 200,
                    message: "user added",
                    data: resultData[0]
                });
            }));
        }
    }));
});
exports.default = UserController;
//# sourceMappingURL=User.js.map