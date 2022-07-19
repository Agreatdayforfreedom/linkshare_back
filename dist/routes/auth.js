"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const routerAuth = express_1.default.Router();
routerAuth.post('/signup', auth_1.signup);
routerAuth.post('/login', auth_1.login);
routerAuth.get('/profile', checkAuth_1.default, auth_1.profile);
exports.default = routerAuth;
