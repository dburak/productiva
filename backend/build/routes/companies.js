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
const company_service_1 = __importDefault(require("../services/company-service"));
const companySchema_1 = require("../zod/companySchema");
const authChecker_1 = require("../middlewares/authChecker");
const router = express_1.default.Router();
router.post('/', authChecker_1.tokenAndUserExtractor, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, legalNumber, country, website } = companySchema_1.createCompanySchema.parse(request.body);
        const savedUser = yield company_service_1.default.createCompany(name, legalNumber, country, website);
        response.status(201).json(savedUser);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/', authChecker_1.tokenAndUserExtractor, (_request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield company_service_1.default.getCompanies();
        response.json(companies);
    }
    catch (error) {
        next(error);
    }
}));
router.put('/:id', authChecker_1.tokenAndUserExtractor, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const { name, legalNumber, country, website } = companySchema_1.createCompanySchema.parse(request.body);
        const updatedCompany = yield company_service_1.default.updateCompanyById(id, name, legalNumber, country, website);
        response.json(updatedCompany);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', authChecker_1.tokenAndUserExtractor, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        yield company_service_1.default.deleteCompanyById(id);
        response.status(204).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
