"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompanySchema = void 0;
const zod_1 = require("zod");
exports.createCompanySchema = zod_1.z.object({
    name: zod_1.z.string(),
    legalNumber: zod_1.z.string(),
    country: zod_1.z.string(),
    website: zod_1.z.string().optional(),
});
