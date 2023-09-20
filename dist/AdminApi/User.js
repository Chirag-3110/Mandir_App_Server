"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DBConfig_1 = require("../Config/DBConfig");
const XLSX = require('xlsx');
const multer = require('multer');
const UserController = express_1.default.Router();
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
const storage = multer.memoryStorage(); // Store files in memory for parsing.
const upload = multer({ storage: storage }).single('file'); // 'file' should match the 'name' attribute
UserController.post("/get-file", upload, (req, res) => {
    console.log(req.file);
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
exports.default = UserController;
//# sourceMappingURL=User.js.map