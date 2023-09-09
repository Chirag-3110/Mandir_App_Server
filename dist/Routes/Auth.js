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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_modal_1 = __importDefault(require("../Modals/Auth.modal"));
const HelperFunction_1 = __importDefault(require("../Middleware/HelperFunction"));
const AuthRoute = express_1.default.Router();
//create user
AuthRoute.post('/createUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    let otp = (0, HelperFunction_1.default)(4);
    const jsonObject = {
        phone: request.phone,
        otp: otp
    };
    let existingUser = yield Auth_modal_1.default.findOne({ phone: jsonObject.phone });
    if (!existingUser) {
        let user = yield Auth_modal_1.default.insertMany(jsonObject);
        if (user) {
            res.send({
                status: 200,
                message: 'otp sent to your number',
                data: user
            });
        }
        else {
            res.send({
                status: 500,
                message: 'Internal Server Error',
                data: {}
            });
        }
    }
    else {
        res.send({
            status: 303,
            message: 'User already exist',
            data: {}
        });
    }
}));
//otp verification
AuthRoute.post('/verify-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    let user = yield Auth_modal_1.default.findOne({ phone: request.phone });
    if (user && request.otp === user.otp) {
        let verifiedUser = yield Auth_modal_1.default.updateOne({ _id: user._id }, { $set: { isVerify: true } });
        if (verifiedUser) {
            res.send({
                status: 200,
                message: "Account Verified",
                data: {}
            });
        }
    }
    else {
        res.send({
            status: 400,
            message: "Invalid Otp",
            data: {}
        });
    }
}));
//complete profile
AuthRoute.post('/complete-profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    let user = yield Auth_modal_1.default.findOne({ phone: request.phone });
    if (user) {
        let createProfile = yield Auth_modal_1.default.updateOne({ _id: user._id }, { $set: { isProfileCompleted: true, fullname: request.name, password: request.password, age: request.age, gotra: request.gotra, address: request.address } });
        if (createProfile) {
            res.send({
                status: 200,
                message: "Profile completed",
                data: { id: user.id, phone: user.phone, isProfileCompleted: true, name: request.name, age: request.age, gotra: request.gotra, address: request.address }
            });
        }
    }
    else {
        res.send({
            status: 400,
            message: "User not exists",
            data: {}
        });
    }
}));
//login api
AuthRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    let user = yield Auth_modal_1.default.findOne({ phone: request.phone });
    if (user) {
        if (request.password === user.password) {
            res.send({
                status: 200,
                message: "You have succressfuly logged in",
                data: user
            });
        }
        else {
            res.send({
                status: 400,
                message: "Invalid password",
                data: {}
            });
        }
    }
    else {
        res.send({
            status: 400,
            message: "User does not exist",
            data: {}
        });
    }
}));
//approve user
AuthRoute.post('/approve-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    let user = yield Auth_modal_1.default.findOne({ _id: request.id });
    if (user) {
        yield Auth_modal_1.default.updateOne({ _id: user._id }, { $set: { isApprove: true } });
        res.send({
            status: 200,
            message: "user approved",
            data: user
        });
    }
    else {
        res.send({
            status: 400,
            message: "User does not exist",
            data: {}
        });
    }
}));
//update user profile
AuthRoute.post('/update-profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    Auth_modal_1.default.updateOne({ _id: request.id }, {
        $set: request.body
    }).then((e) => {
        res.send({
            status: 200,
            message: "User updated successfully",
            data: {}
        });
    }).catch((e) => {
        res.send({
            status: 500,
            message: "User updated successfully",
            data: e
        });
    });
}));
//set password
AuthRoute.post('/set-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.body;
    Auth_modal_1.default.updateOne({ phone: request.phone }, {
        $set: request.password
    }).then((e) => {
        res.send({
            status: 200,
            message: "Password set successfully",
            data: {}
        });
    }).catch((e) => {
        res.send({
            status: 500,
            message: "Error Occured",
            data: e
        });
    });
}));
exports.default = AuthRoute;
//# sourceMappingURL=Auth.js.map