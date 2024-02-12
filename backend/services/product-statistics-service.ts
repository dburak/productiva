import Product from '../models/product';

export async function getSortedCategoriesByProductsCount(): Promise<{
  [key: string]: number;
}> {
  const products = await Product.find({});
  const categoryProductCounts: { [key: string]: number } = {};

  products.forEach((product) => {
    categoryProductCounts[product.category] =
      (categoryProductCounts[product.category] || 0) + 1;
  });

  const sortedCategoriesByProductsCount = Object.fromEntries(
    Object.entries(categoryProductCounts).sort(
      ([, aCount], [, bCount]) => bCount - aCount
    )
  );

  return sortedCategoriesByProductsCount;
}

export async function getNumberOfProducts(): Promise<number> {
  const count = await Product.countDocuments();
  return count;
}

export async function getLatestAddedProducts(): Promise<string[]> {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(3);
  return products.map((product) => product.name);
}

export async function getTodaysAddedProducts(): Promise<string[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysProducts = await Product.find({ createdAt: { $gte: today } });
  return todaysProducts.map((product) => product.name);
}
