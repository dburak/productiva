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
exports.getTodaysAddedProducts = exports.getLatestAddedProducts = exports.getNumberOfProducts = exports.getSortedCategoriesByProductsCount = void 0;
const product_1 = __importDefault(require("../models/product"));
function getSortedCategoriesByProductsCount() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield product_1.default.find({});
        const categoryProductCounts = {};
        products.forEach((product) => {
            const category = product.category.toLowerCase();
            categoryProductCounts[category] =
                (categoryProductCounts[category] || 0) + 1;
        });
        const mergedCategories = {};
        Object.entries(categoryProductCounts).forEach(([category, count]) => {
            const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
            mergedCategories[normalizedCategory] =
                (mergedCategories[normalizedCategory] || 0) + count;
        });
        return mergedCategories;
    });
}
exports.getSortedCategoriesByProductsCount = getSortedCategoriesByProductsCount;
function getNumberOfProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const count = yield product_1.default.countDocuments();
        return count;
    });
}
exports.getNumberOfProducts = getNumberOfProducts;
function getLatestAddedProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield product_1.default.find({}).sort({ createdAt: -1 }).limit(3);
        return products.map((product) => product.name);
    });
}
exports.getLatestAddedProducts = getLatestAddedProducts;
function getTodaysAddedProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todaysProducts = yield product_1.default.find({ createdAt: { $gte: today } });
        return todaysProducts.map((product) => product.name);
    });
}
exports.getTodaysAddedProducts = getTodaysAddedProducts;
