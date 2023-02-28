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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose = __importStar(require("mongoose"));
var dotenv = __importStar(require("dotenv"));
var users_1 = require("./routes/users");
var body_parser_1 = __importDefault(require("body-parser"));
dotenv.config();
var app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '50mb', type: 'application/json' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
var PORT = 9000;
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
});
app.use('/users', users_1.userRoute);
var url = process.env.DB_CONNECT;
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'TestAuth',
};
mongoose.connect(url, options)
    .then(function () {
    console.log('Connected to the Database.');
})
    .catch(function (err) { return console.error(err); });
app.listen(PORT, function () { return console.log("app running on port ".concat(PORT)); });
