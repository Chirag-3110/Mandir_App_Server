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
const bcrypt = require('bcrypt');
const AdminAuthRoute = express_1.default.Router();
const env = require('dotenv');
env.config();
const jwt = require('jsonwebtoken');
AdminAuthRoute.post("/admin/admin-login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    console.log(request, "body");
    const findUser = 'SELECT * FROM admin WHERE email = ?';
    DBConfig_1.connection.query(findUser, [request.email], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.send({
                status: 503,
                message: "internal server error",
                data: null
            });
        }
        let existUser = result[0];
        if (existUser) {
            let isCompared = yield bcrypt.compare(request.password, existUser.password);
            if (isCompared === true) {
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let data = {
                    userId: existUser.id,
                    email: existUser.email
                };
                const token = jwt.sign(data, jwtSecretKey);
                console.log(token);
                res.send({
                    status: 200,
                    message: "User Logged in",
                    data: token
                });
            }
            else {
                res.send({
                    status: 401,
                    message: "Incorrect password",
                    data: null
                });
            }
        }
        else {
            res.send({
                status: 404,
                message: "user not found",
                data: null
            });
        }
    }));
}));
exports.default = AdminAuthRoute;
//# sourceMappingURL=Auth.js.map