import { boolean, number } from "joi";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
})
const userModal = mongoose.model("users", users);
export default userModal;
