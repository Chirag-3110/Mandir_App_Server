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
const Auth_1 = __importDefault(require("./AdminApi/Auth"));
const DBConfig_1 = __importDefault(require("./Config/DBConfig"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./AdminApi/User"));
dotenv_1.default.configDotenv();
const app = (0, express_1.default)();
const cors = require('cors');
const port = process.env.PORT || 8000;
const allowedOrigins = ['https://example.com'];
app.use(express_1.default.json());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(port);
    yield (0, DBConfig_1.default)();
}));
app.use(Auth_1.default);
app.use(User_1.default);
// app.use(NewsRouter)
//# sourceMappingURL=app.js.map