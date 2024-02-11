import express from 'express';
import productService from '../services/product-service';
import { createProductSchema, updateProductSchema } from '../zod/productSchema';
import { tokenAndUserExtractor } from '../middlewares/authChecker';

const router = express.Router();

router.post('/', tokenAndUserExtractor, async (request, response, next) => {
  try {
    const { name, category, amount, unit, company } = createProductSchema.parse(
      request.body
    );

    const savedProuct = await productService.createProduct(
      name,
      category,
      amount,
      unit,
      company
    );
    response.status(201).json(savedProuct);
  } catch (error) {
    next(error);
  }
});

router.get('/', tokenAndUserExtractor, async (_request, response, next) => {
  try {
    const products = await productService.getProducts();
    response.json(products);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', tokenAndUserExtractor, async (request, response, next) => {
  const { id } = request.params;
  const { name, category, amount, unit, company } = updateProductSchema.parse(
    request.body
  );

  try {
    const updatedProduct = await productService.updateProductById(
      id,
      name,
      category,
      amount,
      unit,
      company
    );
    response.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  tokenAndUserExtractor,
  async (request, response, next) => {
    const { id } = request.params;

    try {
      await productService.deleteProductById(id);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
