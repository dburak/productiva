"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string(),
    category: zod_1.z.string(),
    amount: zod_1.z.number(),
    unit: zod_1.z.string(),
    company: zod_1.z.string(),
});
exports.updateProductSchema = exports.createProductSchema;
