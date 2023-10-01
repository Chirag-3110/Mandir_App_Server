"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelperFunction_1 = require("../Middleware/HelperFunction");
const express = require('express');
const Events = express.Router();
Events.get("/app/eventsList", (req, res) => {
    const isVerified = (0, HelperFunction_1.verifyToken)(req);
    if (isVerified === true) {
    }
    else {
        res.send({
            status: 401,
            message: "Unauthenticated",
            data: null
        });
    }
});
exports.default = Events;
//# sourceMappingURL=Events.js.map