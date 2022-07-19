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
exports.uploadProfileAvatar = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const User_1 = __importDefault(require("../models/User"));
const uploadProfileAvatar = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.file) {
        const err = new Error('There is an error uploading profile image');
        return response.status(500).json({ err: err.message });
    }
    try {
        const { path } = request.file;
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            width: 200, height: 200, gravity: "face", radius: "max", effect: "sharpen", crop: "thumb"
        };
        const uploadUserAvatar = yield User_1.default.findById({ _id: request.user._id });
        if (!uploadUserAvatar) {
            const err = new Error('There is an error uploading profile image');
            return response.status(500).json({ err: err.message });
        }
        if (uploadUserAvatar.avatar) {
            const { avatar } = uploadUserAvatar;
            const splitSlash = avatar.split('/');
            const idCloud = splitSlash[splitSlash.length - 1].split('.')[0];
            yield cloudinary_1.default.v2.uploader.destroy(idCloud);
        }
        // Upload the image
        const result = yield cloudinary_1.default.v2.uploader.upload(path, options);
        uploadUserAvatar.avatar = result.secure_url;
        yield uploadUserAvatar.save();
        response.json({ msg: 'Profile image uploaded successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: error.message });
        }
    }
});
exports.uploadProfileAvatar = uploadProfileAvatar;
