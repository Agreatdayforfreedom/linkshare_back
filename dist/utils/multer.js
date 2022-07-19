"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
exports.default = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = file.originalname.split('.').pop();
        if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
            cb(new Error("File type is not supported"));
            return;
        }
        cb(null, true);
    },
    limits: {
        fileSize: 500000,
    }
});
