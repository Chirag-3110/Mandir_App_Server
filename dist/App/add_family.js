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
const express = require('express');
const AddFamily = express.Router();
AddFamily.post("/add-member", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, members } = req.body;
    let userIds = [];
    Promise.all(members.map((member) => {
        const { full_name, email, phone, gender, occupation, age, address, married } = member;
        return new Promise((resolve, reject) => {
            DBConfig_1.connection.query("SELECT * FROM users WHERE email = ? OR phone = ?", [email, phone], (err, result) => {
                if (err) {
                    reject(err);
                }
                const userExist = result;
                if (userExist) {
                    userIds.push(userExist.id);
                    DBConfig_1.connection.query('UPDATE users SET member = ? WHERE id = ?', [JSON.stringify(userIds), id], (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(res);
                    });
                }
                else {
                    DBConfig_1.connection.query('INSERT INTO users SET ?', [full_name, email, phone, gender, occupation, age, address, married], (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        DBConfig_1.connection.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
                            if (err) {
                                reject(err);
                            }
                            if (res) {
                                userIds.push(res.id);
                                DBConfig_1.connection.query("UPDATE users SET member = ? WHERE id = ?", [JSON.stringify(userIds), id], (err, res) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    resolve(res);
                                });
                            }
                        });
                    });
                }
            });
        });
    })).then((resolve) => {
        res.send({
            status: 200,
            message: 'Members Added', data: resolve
        });
    }).catch((err) => {
        res.send({
            status: 500,
            message: 'Something went wrong', data: err
        });
    });
}));
exports.default = AddFamily;
//# sourceMappingURL=add_family.js.map