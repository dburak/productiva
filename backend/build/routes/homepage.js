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
const authChecker_1 = require("../middlewares/authChecker");
const company_statistics_service_1 = require("../services/company-statistics-service");
const product_statistics_service_1 = require("../services/product-statistics-service");
const router = express_1.default.Router();
router.get('/company-statistics', authChecker_1.tokenAndUserExtractor, (_request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortedCompaniesByProductsCount = yield (0, company_statistics_service_1.getSortedCompaniesByProductsCount)();
        const numberOfCompanies = yield (0, company_statistics_service_1.getNumberOfCompanies)();
        const latestAddedCompanies = yield (0, company_statistics_service_1.getLatestAddedCompanies)();
        const todaysAddedCompanies = yield (0, company_statistics_service_1.getTodaysAddedCompanies)();
        const result = {
            sortedCompaniesByProductsCount,
            numberOfCompanies,
            latestAddedCompanies,
            todaysAddedCompanies,
        };
        response.json(result);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/product-statistics', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortedCategoriesByProductsCount = yield (0, product_statistics_service_1.getSortedCategoriesByProductsCount)();
        const numberOfProducts = yield (0, product_statistics_service_1.getNumberOfProducts)();
        const latestAddedProducts = yield (0, product_statistics_service_1.getLatestAddedProducts)();
        const todaysAddedProducts = yield (0, product_statistics_service_1.getTodaysAddedProducts)();
        res.json({
            sortedCategoriesByProductsCount,
            numberOfProducts,
            latestAddedProducts,
            todaysAddedProducts,
        });
    }
    catch (err) {
        console.error('Error while fetching product statistics:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
