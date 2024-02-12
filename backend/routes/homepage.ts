import express from 'express';
import { tokenAndUserExtractor } from '../middlewares/authChecker';
import {
  getSortedCompaniesByProductsCount,
  getNumberOfCompanies,
  getLatestAddedCompanies,
  getTodaysAddedCompanies,
} from '../services/company-statistics-service';
import {
  getSortedCategoriesByProductsCount,
  getNumberOfProducts,
  getLatestAddedProducts,
  getTodaysAddedProducts,
} from '../services/product-statistics-service';

const router = express.Router();

router.get(
  '/company-statistics',
  tokenAndUserExtractor,
  async (_request, response, next) => {
    try {
      const sortedCompaniesByProductsCount =
        await getSortedCompaniesByProductsCount();

      const numberOfCompanies = await getNumberOfCompanies();

      const latestAddedCompanies = await getLatestAddedCompanies();

      const todaysAddedCompanies = await getTodaysAddedCompanies();

      const result = {
        sortedCompaniesByProductsCount,
        numberOfCompanies,
        latestAddedCompanies,
        todaysAddedCompanies,
      };

      response.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/product-statistics', async (_req, res) => {
  try {
    const sortedCategoriesByProductsCount =
      await getSortedCategoriesByProductsCount();
    const numberOfProducts = await getNumberOfProducts();
    const latestAddedProducts = await getLatestAddedProducts();
    const todaysAddedProducts = await getTodaysAddedProducts();

    res.json({
      sortedCategoriesByProductsCount,
      numberOfProducts,
      latestAddedProducts,
      todaysAddedProducts,
    });
  } catch (err) {
    console.error('Error while fetching product statistics:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
