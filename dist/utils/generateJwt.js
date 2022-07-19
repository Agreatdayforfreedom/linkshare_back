"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(id) {
    return jsonwebtoken_1.default.sign({ _id: id }, process.env.JWT_SECRET);
}
exports.default = default_1;
