const env = require('dotenv')
env.config()
const jwt = require('jsonwebtoken');
export  function generateOTP(length) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

export const verifyToken=(req)=>{
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.header(tokenHeaderKey);
        console.log(req.headers.authorization.slice(7));
        
        const verified = jwt.verify(req.headers.authorization.slice(7), jwtSecretKey);
        if(verified){
           return true;
        }else{
            // Access Denied
            return false;
            
        }
    } catch (error) {
        // Access Denied
        return false;
        
    }
}