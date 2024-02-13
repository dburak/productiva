"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const database_connection_1 = require("./database-connection");
const errorHandler_1 = require("./middlewares/errorHandler");
const users_1 = __importDefault(require("./routes/users"));
const login_1 = __importDefault(require("./routes/login"));
const companies_1 = __importDefault(require("./routes/companies"));
const products_1 = __importDefault(require("./routes/products"));
const homepage_1 = __importDefault(require("./routes/homepage"));
const app = (0, express_1.default)();
(0, database_connection_1.connectToDatabase)();
// middlewares
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// routes
app.use('/api/users', users_1.default);
app.use('/api/login', login_1.default);
app.use('/api/companies', companies_1.default);
app.use('/api/products', products_1.default);
app.use('/api/homepage', homepage_1.default);
// Custom middleware to handle errors
app.use(errorHandler_1.errorHandler);
exports.default = app;
