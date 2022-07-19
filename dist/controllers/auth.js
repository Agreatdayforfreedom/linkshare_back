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
exports.profile = exports.login = exports.signup = void 0;
const generateJwt_1 = __importDefault(require("../utils/generateJwt"));
const User_1 = __importDefault(require("../models/User"));
const signup = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = request.body;
    try {
        const userNameExists = yield User_1.default.findOne({ username });
        if (userNameExists) {
            const err = new Error('Username already exists');
            return response.status(400).json({ msg: err.message });
        }
        const newUser = yield User_1.default.create({ username, email, password });
        response.status(201).json({
            token: (0, generateJwt_1.default)(newUser._id),
            user: newUser
        });
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.signup = signup;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    // email is optional
    try {
        const login = yield User_1.default.findOne({ username });
        if (!login) {
            const err = new Error('Incorrect username or password');
            return response.status(400).json({ msg: err.message });
        }
        if (login) {
            if (!(yield login.verifyPassword(password))) {
                const err = new Error('Incorrect username or password');
                return response.status(400).json({ msg: err.message });
            }
            response.json({ token: (0, generateJwt_1.default)(login._id), user: login });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ error: error.message });
        }
    }
});
exports.login = login;
const profile = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.json(request.user);
});
exports.profile = profile;
