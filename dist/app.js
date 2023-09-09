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
const Auth_1 = __importDefault(require("./Routes/Auth"));
const Search_1 = __importDefault(require("./Routes/Search"));
const DBConfig_1 = __importDefault(require("./Config/DBConfig"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const News_1 = __importDefault(require("./Routes/News"));
dotenv_1.default.config();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, DBConfig_1.default)(process.env.URLString);
    console.log(`listening at http://localhost:${port}`);
}));
app.use(Auth_1.default);
app.use(Search_1.default);
app.use(News_1.default);
//# sourceMappingURL=app.js.map