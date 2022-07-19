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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const checkAuth = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = '';
    const simple = request.headers.authorization;
    try {
        if (simple && simple.toLowerCase().startsWith('bearer')) {
            token = simple.split(' ')[1];
            // decoded
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            request.user = yield User_1.default.findById({ _id: payload._id }).select('-password');
            return next();
        }
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ msg: error.message });
        }
    }
    if (!token) {
        const err = new Error('There was a mistake');
        return response.status(500).json({ err });
    }
});
exports.default = checkAuth;
