"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
function errorHandler(error, _request, response, _next) {
    let errorMessage = 'Something went wrong';
    if (error instanceof zod_1.ZodError) {
        response.status(400).json({ error: error.errors });
    }
    else if (error instanceof Error) {
        errorMessage = error instanceof Error ? error.message : error;
        response.status(400).json({
            errorMessage,
        });
    }
    else {
        response.status(500).json({
            errorMessage,
        });
    }
}
exports.errorHandler = errorHandler;
