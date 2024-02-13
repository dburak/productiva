"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenAndUserExtractor = exports.userExtractor = exports.tokenExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const tokenExtractor = (request, response, next) => {
    const authorization = request.headers.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '');
        next();
    }
    else {
        response.status(401).json({ error: 'Unauthorized' });
    }
};
exports.tokenExtractor = tokenExtractor;
const userExtractor = (request, response, next) => {
    try {
        const token = request.token;
        if (!token) {
            return response.status(401).json({ error: 'Token missing' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' });
        }
        request.user = decodedToken;
        next();
    }
    catch (error) {
        response.status(401).json({ error: 'Unauthorized' });
    }
};
exports.userExtractor = userExtractor;
const tokenAndUserExtractor = (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return response.status(401).json({ error: 'Unauthorized' });
        }
        const token = authorization.replace('Bearer ', '');
        if (!token) {
            return response.status(401).json({ error: 'Token missing' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token invalid' });
        }
        request.user = decodedToken;
        next();
    }
    catch (error) {
        response.status(401).json({ error: 'Unauthorized' });
    }
};
exports.tokenAndUserExtractor = tokenAndUserExtractor;
