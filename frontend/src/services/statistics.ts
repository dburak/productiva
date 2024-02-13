import axios from 'axios';
import { CompanyStatistics, ProductStatistics } from '../types';

const baseUrl = '/api';
let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getCompanyStatistics = async () => {
  const response = await axios.get<CompanyStatistics>(
    `${baseUrl}/homepage/company-statistics`,
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};

const getProductStatistics = async () => {
  const response = await axios.get<ProductStatistics>(
    `${baseUrl}/homepage/product-statistics`,
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};

export default {
  setToken,
  getCompanyStatistics,
  getProductStatistics,
};
