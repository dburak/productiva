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
const product_service_1 = __importDefault(require("../services/product-service"));
const productSchema_1 = require("../zod/productSchema");
const authChecker_1 = require("../middlewares/authChecker");
const router = express_1.default.Router();
router.post('/', authChecker_1.tokenAndUserExtractor, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category, amount, unit, company } = productSchema_1.createProductSchema.parse(request.body);
        const savedProuct = yield product_service_1.default.createProduct(name, category, amount, unit, company);
        response.status(201).json(savedProuct);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/', authChecker_1.tokenAndUserExtractor, (_request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_service_1.default.getProducts();
        response.json(products);
    }
    catch (error) {
        next(error);
    }
}));
router.put('/:id', authChecker_1.tokenAndUserExtractor, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { name, category, amount, unit, company } = productSchema_1.updateProductSchema.parse(request.body);
    try {
        const updatedProduct = yield product_service_1.default.updateProductById(id, name, category, amount, unit, company);
        response.json(updatedProduct);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', authChecker_1.tokenAndUserExtractor, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        yield product_service_1.default.deleteProductById(id);
        response.status(204).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
