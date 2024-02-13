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
const express_1 = __importDefault(require("express"));
const user_service_1 = __importDefault(require("../services/user-service"));
const userSchema_1 = require("../zod/userSchema");
const router = express_1.default.Router();
router.post('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = userSchema_1.createUserSchema.parse(request.body);
        const savedUser = yield user_service_1.default.createUser(email, name, password);
        response.status(201).json(savedUser);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
