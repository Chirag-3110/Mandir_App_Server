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
var mysql = require('mysql');
exports.connection = mysql.createConnection({
    host: process.env.HOST,
    user: "root",
    password: '',
    database: "jainMandir"
});
const configMongoDB = (host, user, password) => __awaiter(void 0, void 0, void 0, function* () {
    exports.connection.connect(function (err, result) {
        if (err)
            throw err;
        console.log("Connected!");
        exports.connection.query("CREATE DATABASE jainMandir", function (err, result) {
            if (err) {
                console.log("Database connected");
            }
            ;
            console.log("Database created");
        });
    });
});
exports.default = configMongoDB;
//# sourceMappingURL=DBConfig.js.map