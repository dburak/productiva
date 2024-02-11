import Product, { ProductDocument } from '../models/product';
import Company, { CompanyDocument } from '../models/company';

const createProduct = async (
  name: string,
  category: string,
  amount: number,
  unit: string,
  companyId: string
) => {
  const company: CompanyDocument | null = await Company.findById(companyId);

  if (!company) {
    throw new Error('Company not found');
  }

  const newProduct = new Product({
    name,
    category,
    amount,
    unit,
    company: companyId,
  });

  company.products = company.products.concat(newProduct.id);
  company.save();

  try {
    const savedProduct: ProductDocument = await newProduct.save();
    return savedProduct;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
};

const getProducts = async () => {
  const products: ProductDocument[] = await Product.find({});
  return products;
};

const updateProductById = async (
  id: string,
  name: string,
  category: string,
  amount: number,
  unit: string,
  companyId: string
) => {
  const company: CompanyDocument | null = await Company.findById(companyId);

  if (!company) {
    throw new Error('Company not found');
  }

  const updatedProduct = {
    name,
    category,
    amount,
    unit,
    company: companyId,
  };

  const savedProduct: ProductDocument | null = await Product.findByIdAndUpdate(
    id,
    updatedProduct,
    { new: true }
  );

  if (!savedProduct) {
    throw new Error('Product not found');
  }

  return savedProduct;
};

const deleteProductById = async (id: string) => {
  const product: ProductDocument | null = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

export default {
  createProduct,
  getProducts,
  updateProductById,
  deleteProductById,
};
