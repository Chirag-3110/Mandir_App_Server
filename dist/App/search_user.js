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
        const sql = `SELECT * FROM users WHERE name LIKE ?`;
        DBConfig_1.connection.query(sql, [name], (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            res.send({
                status: 200,
                message: "Users list",
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
exports.default = Searh;
//# sourceMappingURL=search_user.js.map