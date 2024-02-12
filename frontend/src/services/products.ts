import axios from 'axios';
import { Product, UpdateProduct, ProductsWithCategories } from '../types';

const baseUrl = '/api';
let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getProducts = async () => {
  const response = await axios.get<ProductsWithCategories>(
    `${baseUrl}/products`,
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};

const createProduct = async (newProduct: Product) => {
  const response = await axios.post<Product>(
    `${baseUrl}/products`,
    newProduct,
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};

const updateProduct = async (updatedProduct: UpdateProduct) => {
  const response = await axios.put<Product>(
    `${baseUrl}/products/${updatedProduct.id}`,
    updatedProduct,
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};

const deleteProduct = async (id: string) => {
  await axios.delete(`${baseUrl}/products/${id}`, {
    headers: { Authorization: token },
  });
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  setToken,
};
