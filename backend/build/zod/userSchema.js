"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const emailSchema = zod_1.z.string().email();
const passwordSchema = zod_1.z.string().min(3);
exports.createUserSchema = zod_1.z.object({
    email: emailSchema,
    name: zod_1.z.string(),
    password: passwordSchema,
});
exports.loginUserSchema = zod_1.z.object({
    email: emailSchema,
    password: passwordSchema,
});
