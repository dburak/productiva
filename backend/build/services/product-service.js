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
const product_1 = __importDefault(require("../models/product"));
const company_1 = __importDefault(require("../models/company"));
const createProduct = (name, category, amount, unit, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield company_1.default.findById(companyId);
    if (!company) {
        throw new Error('Company not found');
    }
    const newProduct = new product_1.default({
        name,
        category,
        amount,
        unit,
        company: companyId,
    });
    company.products = company.products.concat(newProduct.id);
    company.save();
    try {
        const savedProduct = yield newProduct.save();
        return savedProduct;
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
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const formatCategory = (category) => {
        return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    };
    const products = yield product_1.default.find({});
    const filterByCategory = [
        ...new Set(products.map((product) => formatCategory(product.category))),
    ];
    const productsWithCategories = {
        filterByCategory,
        products,
    };
    return productsWithCategories;
});
const updateProductById = (id, name, category, amount, unit, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield company_1.default.findById(companyId);
    if (!company) {
        throw new Error('Company not found');
    }
    const updatedProduct = {
        name,
        category,
        amount,
        unit,
        company: companyId,
    };
    const savedProduct = yield product_1.default.findByIdAndUpdate(id, updatedProduct, { new: true });
    if (!savedProduct) {
        throw new Error('Product not found');
    }
    return savedProduct;
});
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findById(id);
    if (!product) {
        throw new Error('Product not found');
    }
    // delete product from company's products list
    if (product) {
        const company = yield company_1.default.findById(product.company);
        if (company) {
            company.products = company.products.filter((product) => String(product._id) !== id);
            company.save();
        }
    }
    yield product_1.default.deleteOne({ _id: id });
    return product;
});
exports.default = {
    createProduct,
    getProducts,
    updateProductById,
    deleteProductById,
};
