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
    for (let index = 0; index < members.length; index++) {
        const { full_name, email, phone, gender, occupation, age, address, married } = members[index];
        let isUser = yield checkUser(email, phone);
        console.log(isUser, "isUser");
    }
}));
function checkUser(email, phone) {
    DBConfig_1.connection.query("SELECT * FROM users WHERE email = ? OR phone = ?", [email, phone], (err, result) => {
        if (err) {
            return {
                status: false,
                data: null
            };
        }
        const userExist = result;
        if (userExist) {
            return {
                status: true,
                data: userExist
            };
        }
        else {
            return {
                status: false,
                data: null
            };
        }
    });
}
exports.default = AddFamily;
//# sourceMappingURL=add_family.js.map