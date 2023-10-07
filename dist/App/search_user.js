"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConfig_1 = require("../Config/DBConfig");
const HelperFunction_1 = require("../Middleware/HelperFunction");
const express = require('express');
const Searh = express.Router();
Searh.post("/user/search", (req, res) => {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        const { query } = req.body;
        const sql = `SELECT * FROM users WHERE full_name LIKE ? OR phone LIKE ? OR gotra LIKE ? OR occupation LIKE ?`;
        DBConfig_1.connection.query(sql, [`%${query}%`], (err, result) => {
            if (err) {
                res.json({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            res.json({
                status: 200,
                message: "Users List",
                data: result
            });
        });
    }
    else {
        res.json({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
});
exports.default = Searh;
//# sourceMappingURL=search_user.js.map