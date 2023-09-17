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
var mysql = require('mysql');
const configMongoDB = (host, user, password) => __awaiter(void 0, void 0, void 0, function* () {
    let con = mysql.createConnection({
        host: host,
        user: "root",
        password: ''
    });
    con.connect(function (err) {
        if (err)
            throw err;
        console.log("Connected!");
        con.query("CREATE DATABASE jainMandir", function (err, result) {
            if (err)
                throw err;
            console.log("Database created");
        });
    });
});
exports.default = configMongoDB;
//# sourceMappingURL=DBConfig.js.map