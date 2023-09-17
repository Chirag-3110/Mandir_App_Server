"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminAuthRoute = express_1.default.Router();
AdminAuthRoute.post("/admin-login", (req, res) => {
    let request = req.body;
});
AdminAuthRoute.post("/admin-create", (req, res) => {
    let request = req.body;
    console.log(request, "reques");
});
exports.default = AdminAuthRoute;
//# sourceMappingURL=Auth.js.map