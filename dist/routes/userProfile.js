"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userProfile_1 = require("../controllers/userProfile");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const multer_1 = __importDefault(require("../utils/multer"));
const routerUserProfile = express_1.default.Router();
routerUserProfile.put('/upload', checkAuth_1.default, multer_1.default.single('avatar'), userProfile_1.uploadProfileAvatar);
exports.default = routerUserProfile;
