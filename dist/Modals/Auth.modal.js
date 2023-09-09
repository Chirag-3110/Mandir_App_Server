"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let users = new Schema({
    fullname: {
        type: String,
        default: null
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        default: null
    },
    isProfileCompleted: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isApprove: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    otp: {
        type: Number,
        default: null
    },
    gotra: {
        type: String,
        default: null
    }
});
const userModal = mongoose_1.default.model("users", users);
exports.default = userModal;
//# sourceMappingURL=Auth.modal.js.map