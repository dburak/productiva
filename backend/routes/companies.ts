import express from 'express';
import companyService from '../services/company-service';
import { createCompanySchema } from '../zod/companySchema';
import { tokenAndUserExtractor } from '../middlewares/authChecker';

const router = express.Router();

router.post('/', tokenAndUserExtractor, async (request, response, next) => {
  try {
    const { name, legalNumber, country, website } = createCompanySchema.parse(
      request.body
    );

    const savedUser = await companyService.createCompany(
      name,
      legalNumber,
      country,
      website
    );
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

router.get('/', tokenAndUserExtractor, async (_request, response, next) => {
  try {
    const companies = await companyService.getCompanies();
    response.json(companies);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', tokenAndUserExtractor, async (request, response, next) => {
  try {
    const id = request.params.id;
    const { name, legalNumber, country, website } = createCompanySchema.parse(
      request.body
    );
    const updatedCompany = await companyService.updateCompanyById(
      id,
      name,
      legalNumber,
      country,
      website
    );
    response.json(updatedCompany);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  tokenAndUserExtractor,
  async (request, response, next) => {
    try {
      const id = request.params.id;
      await companyService.deleteCompanyById(id);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
