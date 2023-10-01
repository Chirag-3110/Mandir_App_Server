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
const DBConfig_1 = require("../Config/DBConfig");
const HelperFunction_1 = require("../Middleware/HelperFunction");
const jwt = require('jsonwebtoken');
const express = require('express');
const Auth = express.Router;
const env = require('dotenv');
env.config();
Auth.post('/app/send-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body;
    const countQuery = `SELECT * FROM users WHERE phone = ?`;
    DBConfig_1.connection.query(countQuery, [phone], (err, result) => {
        if (err) {
            res.send({
                status: 500,
                message: "Internal Server Error",
                data: err
            });
        }
        let existUser = result[0];
        if (existUser) {
            if (existUser.is_active == 1) {
                if (existUser.is_delete == 0) {
                    const otp = (0, HelperFunction_1.generateOTP)(4);
                    const updateUser = `UPDATE users SET otp = ${otp} WHERE phone = ?`;
                    DBConfig_1.connection.query(updateUser, [phone], (err, result) => {
                        if (err) {
                            res.send({
                                status: 500,
                                message: "Internal Server Error",
                                data: null
                            });
                        }
                        res.send({
                            status: 200,
                            message: "Otp Sent Successfully",
                            otp: otp,
                        });
                    });
                }
                else {
                    res.send({
                        status: 404,
                        message: "Account Deleted",
                        data: null
                    });
                }
            }
            else {
                res.send({
                    status: 404,
                    message: "Account is deactivated,contact admin",
                    data: null
                });
            }
        }
        else {
            res.send({
                status: 404,
                message: "No User Found",
                data: null
            });
        }
    });
}));
Auth.post("/app/verify_otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, otp } = req.body;
    const countQuery = `SELECT * FROM users WHERE phone = ?`;
    DBConfig_1.connection.query(countQuery, [phone], (err, result) => {
        if (err) {
            res.send({
                status: 500,
                message: "Internal Server Error",
                data: err
            });
        }
        let existUser = result[0];
        if (existUser.otp == otp) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                userId: existUser.id,
                email: existUser.phone
            };
            const token = jwt.sign(data, jwtSecretKey);
            existUser.token = token;
            res.send({
                status: 200,
                message: "OTP verified successfully",
                data: existUser
            });
        }
        else {
            res.send({
                status: 404,
                message: "Invalid OTP",
                data: null
            });
        }
    });
}));
Auth.post("/app/complete-profile", (req, res) => {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        const { id, full_name, email, gender, occupation, age, gotra, address, } = req.body;
        const updateQuery = 'UPDATE users SET full_name = ?,email = ?,gender = ?,occupation = ?,age = ?,gotra = ?,address = ? WHERE id = ?';
        DBConfig_1.connection.query(updateQuery, [full_name, email, gender, occupation, age, gotra, address, id], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            else {
                res.send({
                    status: 200,
                    message: "User Updated",
                    data: null
                });
            }
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
exports.default = Auth;
//# sourceMappingURL=Auth.js.map