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
const company_1 = __importDefault(require("../models/company"));
const createCompany = (name, legalNumber, country, website) => __awaiter(void 0, void 0, void 0, function* () {
    const newCompany = new company_1.default({
        name,
        legalNumber,
        country,
        website,
    });
    try {
        const savedCompany = yield newCompany.save();
        return savedCompany;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error('Something went wrong');
        }
    }
});
const getCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    const companies = yield company_1.default.find({});
    return companies;
});
const updateCompanyById = (id, name, legalNumber, country, website) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield company_1.default.findById(id);
    if (!company) {
        throw new Error('Company not found');
    }
    const updatedOject = {
        name,
        legalNumber,
        country,
        website,
    };
    const updatedCompany = yield company_1.default.findByIdAndUpdate(id, updatedOject, {
        new: true,
    });
    return updatedCompany;
});
const deleteCompanyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCompany = yield company_1.default.findById(id);
    if (!deletedCompany) {
        throw new Error('Company not found');
    }
    if (deletedCompany.products.length > 0)
        throw new Error('Company has products, cannot delete');
    yield company_1.default.deleteOne({ _id: id });
    return deletedCompany;
});
exports.default = {
    createCompany,
    getCompanies,
    updateCompanyById,
    deleteCompanyById,
};
