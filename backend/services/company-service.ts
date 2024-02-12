import Company, { CompanyDocument } from '../models/company';

const createCompany = async (
  name: string,
  legalNumber: string,
  country: string,
  website: string | undefined
) => {
  const newCompany = new Company({
    name,
    legalNumber,
    country,
    website,
  });

  try {
    const savedCompany: CompanyDocument = await newCompany.save();
    return savedCompany;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
};

const getCompanies = async () => {
  const companies = await Company.find({});
  return companies;
};

const updateCompanyById = async (
  id: string,
  name: string,
  legalNumber: string,
  country: string,
  website: string | undefined
) => {
  const company = await Company.findById(id);

  if (!company) {
    throw new Error('Company not found');
  }

  const updatedOject = {
    name,
    legalNumber,
    country,
    website,
  };

  const updatedCompany = await Company.findByIdAndUpdate(id, updatedOject, {
    new: true,
  });

  return updatedCompany;
};

const deleteCompanyById = async (id: string) => {
  const deletedCompany = await Company.findById(id);

  if (!deletedCompany) {
    throw new Error('Company not found');
  }

  if (deletedCompany.products.length > 0)
    throw new Error('Company has products, cannot delete');

  await Company.deleteOne({ _id: id });

  return deletedCompany;
};

export default {
  createCompany,
  getCompanies,
  updateCompanyById,
  deleteCompanyById,
};
