import axios from 'axios';
import { Company, CreateCompany } from '../types';

const baseUrl = 'https://productiva-server.onrender.com/api';
let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getCompanies = async () => {
  const response = await axios.get<Company[]>(`${baseUrl}/companies`, {
    headers: { Authorization: token },
  });
  return response.data;
};

const createCompany = async (newCompany: CreateCompany) => {
  const response = await axios.post<Company>(
    `${baseUrl}/companies`,
    newCompany,
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};

const updateCompany = async (company: Company) => {
  const response = await axios.put<Company>(
    `${baseUrl}/companies/${company.id}`,
    company,
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};

const deleteCompany = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/companies/${id}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export default {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  setToken,
};
