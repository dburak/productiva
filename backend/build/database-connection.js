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
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./utils/config"));
const mongoUrl = config_1.default.MONGODB_URI;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (mongoUrl) {
                yield mongoose_1.default.connect(mongoUrl);
                console.log('Connected to MongoDB');
            }
            else {
                console.error('MongoDB URI is undefined');
            }
        }
        catch (error) {
            let errorMessage = 'Error connecting to MongoDB';
            if (error instanceof Error) {
                errorMessage += error.message;
            }
            console.error(errorMessage);
        }
    });
}
exports.connectToDatabase = connectToDatabase;
