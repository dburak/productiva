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
exports.getTodaysAddedCompanies = exports.getLatestAddedCompanies = exports.getNumberOfCompanies = exports.getSortedCompaniesByProductsCount = void 0;
const company_1 = __importDefault(require("../models/company"));
function getSortedCompaniesByProductsCount() {
    return __awaiter(this, void 0, void 0, function* () {
        const companies = yield company_1.default.find({});
        const companyProductsCount = {};
        companies.forEach((company) => {
            companyProductsCount[company.name] = company.products.length;
        });
        const sortedCompaniesByProductsCount = Object.fromEntries(Object.entries(companyProductsCount)
            .sort(([, aCount], [, bCount]) => bCount - aCount)
            .slice(0, 5));
        return sortedCompaniesByProductsCount;
    });
}
exports.getSortedCompaniesByProductsCount = getSortedCompaniesByProductsCount;
function getNumberOfCompanies() {
    return __awaiter(this, void 0, void 0, function* () {
        const companies = yield company_1.default.find({});
        return Object.keys(companies).length;
    });
}
exports.getNumberOfCompanies = getNumberOfCompanies;
function getLatestAddedCompanies() {
    return __awaiter(this, void 0, void 0, function* () {
        const companies = yield company_1.default.find({})
            .sort({ createdAt: -1 })
            .limit(3);
        return companies.map((company) => company.name);
    });
}
exports.getLatestAddedCompanies = getLatestAddedCompanies;
function getTodaysAddedCompanies() {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todaysCompanies = yield company_1.default.find({
            createdAt: { $gte: today },
        });
        return todaysCompanies.map((company) => company.name);
    });
}
exports.getTodaysAddedCompanies = getTodaysAddedCompanies;
