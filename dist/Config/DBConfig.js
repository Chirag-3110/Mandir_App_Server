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
exports.connection = void 0;
const tables_1 = require("./tables");
var mysql = require('mysql');
const encrypt = require('bcrypt');
const options = {
    host: "localhost",
    user: "root",
    password: "",
    database: "dbujai"
};
const saltRounds = 10;
exports.connection = mysql.createConnection(options);
const configMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.connection.connect(function (err, result) {
        if (err)
            throw err;
        exports.connection.query(`CREATE DATABASE IF NOT EXISTS dbujai`, function (err, result) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Database created or already exists");
                    exports.connection.query(tables_1.userTable);
                    exports.connection.query(tables_1.events);
                    exports.connection.query(tables_1.news);
                    exports.connection.query(tables_1.featured);
                    exports.connection.query(tables_1.admins);
                }
            });
        });
    });
});
exports.default = configMongoDB;
//# sourceMappingURL=DBConfig.js.map