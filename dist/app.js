"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const DBConfig_1 = __importStar(require("./Config/DBConfig"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./AdminApi/User"));
const Events_1 = __importDefault(require("./AdminApi/Events"));
dotenv_1.default.configDotenv();
const app = (0, express_1.default)();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8000;
const News_1 = __importDefault(require("./AdminApi/News"));
const AppAuth_1 = __importDefault(require("./App/AppAuth"));
const Events_2 = __importDefault(require("./App/Events"));
const Users_1 = __importDefault(require("./App/Users"));
const News_2 = __importDefault(require("./App/News"));
const add_family_1 = __importDefault(require("./App/add_family"));
app.use(express_1.default.json());
const corsOptions = {
    origin: ['http://139.144.1.59:80', 'http://139.144.1.59:9999', 'http://localhost:3000'],
};
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://139.144.1.59');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(cors(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DBConfig_1.default)();
    DBConfig_1.connection.query("ALTER TABLE users ADD COLUMN members JSON");
}));
app.use(Auth_1.default);
app.use(User_1.default);
app.use(Events_1.default);
const imagesDirectory = path.join(__dirname, '../Images'); // Replace 'Images' with your image directory's name
// Create a route to serve images
app.use('/Images', express_1.default.static(imagesDirectory));
app.use(News_1.default);
// app.use(NewsRouter
//approutes
app.use(AppAuth_1.default);
app.use(Events_2.default);
app.use(Users_1.default);
app.use(News_2.default);
app.use(add_family_1.default);
//# sourceMappingURL=app.js.map