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
const AuthRoute = express_1.default.Router();
const jwt = require('jsonwebtoken');
//create user
AuthRoute.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    let otp = (0, HelperFunction_1.generateOTP)(4);
    const jsonObject = {
        phone: request.phone,
        otp: otp
    };
    const findUser = 'SELECT COUNT(*) as count FROM user WHERE phone_number = ?';
    let existingUser = yield DBConfig_1.connection.query(findUser, [request.phone]);
    if (existingUser[0].count == 0) {
        const createUser = 'INSERT INTO user (phone_number) VALUES (?)';
        DBConfig_1.connection.query(createUser, (err, result) => {
            if (err) {
                res.json({
                    status: 500,
                    message: 'Internal Server Error',
                    data: {}
                });
            }
            res.json({
                status: 200,
                message: 'otp sent to your number',
                data: result
            });
        });
    }
    else {
        res.json({
            status: 303,
            message: 'User already exist',
            data: {}
        });
    }
}));
//otp verification
AuthRoute.post('/verify-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    const findUser = 'SELECT COUNT(*) as count FROM users WHERE phone_number = ?';
    let existingUser = yield DBConfig_1.connection.query(findUser, [request.phone]);
    if (existingUser && request.otp === existingUser.otp) {
        const updateQuery = 'UPDATE users SET is_verify = ? WHERE phone = ?';
        DBConfig_1.connection.query(updateQuery, [false], (err, result) => {
            if (err) {
                res.json({
                    status: 400,
                    message: err,
                    data: {}
                });
            }
            res.json({
                status: 200,
                message: "Account Verified",
                data: {}
            });
        });
    }
    else {
        res.json({
            status: 400,
            message: "Invalid Otp",
            data: {}
        });
    }
}));
//complete profile
exports.default = AuthRoute;
//# sourceMappingURL=Auth.js.map