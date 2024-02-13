"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;
const HOST_URL = process.env.HOST_URL || 'http://localhost:3003';
const SECRET = process.env.SECRET;
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
}
if (!SECRET) {
    throw new Error('SECRET is not set');
}
const config = {
    PORT,
    MONGODB_URI,
    HOST_URL,
    SECRET,
};
exports.default = config;
