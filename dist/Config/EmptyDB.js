"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConfig_1 = require("./DBConfig");
const express = require('express');
const ClearDB = express.Router();
const HelperFunction_1 = require("../Middleware/HelperFunction");
const getTablesQuery = 'SHOW TABLES';
let isDeleted = false;
ClearDB.get("/clear-db", (req, res) => {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
        DBConfig_1.connection.query(getTablesQuery, (err, result) => {
            if (err) {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
            result.forEach((row) => {
                const tableName = row["Tables_in_jaiDB"];
                const truncateTableQuery = `TRUNCATE TABLE ${tableName}`;
                DBConfig_1.connection.query(truncateTableQuery, (err, truncateResult) => {
                    if (err) {
                        isDeleted = false;
                    }
                    else {
                        isDeleted = true;
                    }
                });
            });
            if (isDeleted === true) {
                res.send({
                    status: 200,
                    message: "db cleared",
                    data: result
                });
            }
            else {
                res.send({
                    status: 500,
                    message: "Internal server error",
                    data: err
                });
            }
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
exports.default = ClearDB;
//# sourceMappingURL=EmptyDB.js.map