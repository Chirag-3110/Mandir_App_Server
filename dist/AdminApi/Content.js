"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const ContentRouter = express.Router();
ContentRouter.post("/app-content", (req, res) => {
    const request = req.body;
});
exports.default = ContentRouter;
//# sourceMappingURL=Content.js.map