"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aleatoryAvatar = void 0;
const aleatoryAvatar = () => {
    const publicIds = [
        'platon-default_rhwxtt',
        'borges_default_xd8r9u',
        'dostoievski_default_higmwy',
        'poe-default_lncx9g',
        'nietzsche_default_zdgcg4'
    ];
    const publicId = publicIds[Math.floor(Math.random() * publicIds.length)];
    return `https://res.cloudinary.com/dxge0fbsg/image/upload/ar_1:1,b_rgb:262c35,bo_0px_solid_rgb:000000,c_fill,g_auto,r_max,w_1000/v1658278491/defaults/${publicId}.jpg`;
};
exports.aleatoryAvatar = aleatoryAvatar;
