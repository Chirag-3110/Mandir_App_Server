"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateOTP(length) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
exports.default = generateOTP;
//# sourceMappingURL=HelperFunction.js.map