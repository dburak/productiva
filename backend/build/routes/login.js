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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_service_1 = require("../services/login-service");
const userSchema_1 = require("../zod/userSchema");
const router = (0, express_1.Router)();
router.post('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = userSchema_1.loginUserSchema.parse(request.body);
        const user = yield (0, login_service_1.login)(email, password);
        response.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
