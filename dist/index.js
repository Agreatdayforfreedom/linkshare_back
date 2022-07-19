"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const post_1 = __importDefault(require("./routes/post"));
const auth_1 = __importDefault(require("./routes/auth"));
const commentPost_1 = __importDefault(require("./routes/commentPost"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const userProfile_1 = __importDefault(require("./routes/userProfile"));
// Return "https" URLs by setting secure: true
cloudinary_1.default.v2.config({
    cloud_name: 'dxge0fbsg',
    api_key: '717573123345951',
    api_secret: 'DAENqQKwLdajA9V18_xdQ3seR9E',
    secure: true
});
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT, 10);
const app = (0, express_1.default)();
(0, database_1.connectDB)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.use('/post', post_1.default);
app.use('/auth', auth_1.default);
app.use('/comment', commentPost_1.default);
app.use('/profile', userProfile_1.default);
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
