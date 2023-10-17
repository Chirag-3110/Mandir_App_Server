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
const image_upload_1 = require("../Middleware/image_upload");
const express = require('express');
const Ads = express.Router();
Ads.get("/admin/get-ads", image_upload_1.upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isVerify = (0, HelperFunction_1.verifyToken)(req);
    if (isVerify === true) {
        if (req.file) {
            let { screen, file } = req.body;
            let filePath = req.file.filename;
            file = filePath;
            DBConfig_1.connection.query("INSERT INTO ads SET ?", { screen: screen, file: file }, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.json({
                        status: 500,
                        message: "Internal Srver Error",
                        data: err
                    });
                }
                else {
                    res.json({
                        status: 200,
                        message: "Success",
                        data: result
                    });
                }
            }));
        }
        else {
            res.json({
                status: 400,
                message: "No File",
                data: null
            });
        }
    }
    else {
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
}));
Ads.get("/admin/add-ads", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    DBConfig_1.connection.query("SELECT * FROM ads", (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.json({
                status: 500,
                message: "Internal Srver Error",
                data: err
            });
        }
        else {
            res.json({
                status: 200,
                message: "Success",
                data: result
            });
        }
    }));
}));
exports.default = Ads;
//# sourceMappingURL=Ads.js.map