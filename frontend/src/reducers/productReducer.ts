import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import productService from '../services/products';
import { Dispatch } from 'redux';
import {
  ProductsState,
  Product,
  UpdateProduct,
  ProductsWithCategories,
} from '../types';

const initialState: ProductsState = {
  filterByCategory: [],
  products: [],
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductsWithCategories>) {
      state.products = action.payload.products;
      state.filterByCategory = action.payload.filterByCategory;
    },
    addNewProduct(state, action: PayloadAction<Product>) {
      const { category } = action.payload;
      const formattedCategory =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

      state.products = [...state.products, action.payload];

      if (!state.filterByCategory.includes(formattedCategory)) {
        state.filterByCategory = [...state.filterByCategory, formattedCategory];
      }
    },

    updateProduct(state, action: PayloadAction<Product>) {
      const updatedProduct = action.payload;
      state.products = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );

      const updatedProductCategory = updatedProduct.category;
      const formattedCategory =
        updatedProductCategory.charAt(0).toUpperCase() +
        updatedProductCategory.slice(1).toLowerCase();

      if (!state.filterByCategory.includes(formattedCategory)) {
        state.filterByCategory = [...state.filterByCategory, formattedCategory];
      }
    },

    deleteProduct(state, action: PayloadAction<string>) {
      const deletedProductId = action.payload;
      const deletedProduct = state.products.find(
        (product) => product.id === deletedProductId
      );

      if (!deletedProduct) return;

      const deletedProductCategory =
        deletedProduct.category.charAt(0).toUpperCase() +
        deletedProduct.category.slice(1).toLowerCase();

      state.products = state.products.filter(
        (product) => product.id !== deletedProductId
      );

      const categoryExists = state.products.some((product) => {
        const formattedCategory =
          product.category.charAt(0).toUpperCase() +
          product.category.slice(1).toLowerCase();
        return formattedCategory === deletedProductCategory;
      });

      if (!categoryExists) {
        state.filterByCategory = state.filterByCategory.filter((category) => {
          const formattedCategory =
            category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
          return formattedCategory !== deletedProductCategory;
        });
      }
    },
  },
});

export const getReduxProducts = () => {
  return async (dispatch: Dispatch) => {
    const products = await productService.getProducts();
    dispatch(setProducts(products));
  };
};

export const createReduxProduct = (product: Product) => {
  return async (dispatch: Dispatch) => {
    const newCompany = await productService.createProduct(product);
    dispatch(addNewProduct(newCompany));
  };
};

export const updateReduxProduct = (product: UpdateProduct) => {
  return async (dispatch: Dispatch) => {
    const updatedProduct = await productService.updateProduct(product);
    dispatch(updateProduct(updatedProduct));
  };
};

export const deleteReduxProduct = (id: string) => {
  return async (dispatch: Dispatch) => {
    await productService.deleteProduct(id);
    dispatch(deleteProduct(id));
  };
};

export const { setProducts, addNewProduct, updateProduct, deleteProduct } =
  ProductSlice.actions;
export default ProductSlice.reducer;
