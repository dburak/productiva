import Company, { CompanyDocument } from '../models/company';

export async function getSortedCompaniesByProductsCount(): Promise<{
  [key: string]: number;
}> {
  const companies: CompanyDocument[] = await Company.find({});

  const companyProductsCount: { [key: string]: number } = {};

  companies.forEach((company: CompanyDocument) => {
    companyProductsCount[company.name] = company.products.length;
  });

  const sortedCompaniesByProductsCount: { [key: string]: number } =
    Object.fromEntries(
      Object.entries(companyProductsCount)
        .sort(([, aCount], [, bCount]) => bCount - aCount)
        .slice(0, 5)
    );

  return sortedCompaniesByProductsCount;
}

export async function getNumberOfCompanies(): Promise<number> {
  const companies: CompanyDocument[] = await Company.find({});
  return Object.keys(companies).length;
}

export async function getLatestAddedCompanies(): Promise<string[]> {
  const companies: CompanyDocument[] = await Company.find({})
    .sort({ createdAt: -1 })
    .limit(3);

  return companies.map((company: CompanyDocument) => company.name);
}

export async function getTodaysAddedCompanies(): Promise<string[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysCompanies: CompanyDocument[] = await Company.find({
    createdAt: { $gte: today },
  });

  return todaysCompanies.map((company: CompanyDocument) => company.name);
}
