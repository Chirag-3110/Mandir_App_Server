"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCutomRequest = exports.generateOTP = void 0;
function generateOTP(length) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
exports.generateOTP = generateOTP;
function addCutomRequest(req) {
}
exports.addCutomRequest = addCutomRequest;
//# sourceMappingURL=HelperFunction.js.map