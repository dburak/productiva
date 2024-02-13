export interface LoggedUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export type User = Omit<LoggedUser, 'token'>;

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export type LoginCredentials = Omit<SignupCredentials, 'name'>;

export interface AuthFormValues {
  email: string;
  password: string;
  name: string;
}

export interface AuthState {
  login: LoggedUser | null;
}

export interface Company {
  id: string;
  name: string;
  legalNumber: string;
  country: string;
  website?: string;
  products: Product[];
}

export type CreateCompany = Omit<Company, 'products'>;

export type CompanyProducts = Pick<Company, 'products'>;

export interface Product {
  id: string;
  name: string;
  category: string;
  amount: number;
  unit: string;
  company: Company;
}

export type ProductsWithCategories = {
  filterByCategory: string[];
  products: Product[];
};

export interface UpdateProduct {
  id: string;
  name: string;
  category: string;
  amount: number;
  unit: string;
  company: string;
}

export interface ProductsState {
  filterByCategory: string[];
  products: Product[];
}

export interface CompaniesState {
  companies: Company[];
}

export interface CompanyStatistics {
  sortedCompaniesByProductsCount: { [key: string]: number };
  numberOfCompanies: number;
  latestAddedCompanies: string[];
  todaysAddedCompanies: string[];
}

export interface ProductStatistics {
  sortedCategoriesByProductsCount: { [key: string]: number };
  numberOfProducts: number;
  latestAddedProducts: string[];
  todaysAddedProducts: string[];
}
