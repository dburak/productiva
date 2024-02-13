import { useEffect, useState } from 'react';
import { Row, Spin } from 'antd';
import statisticsService from '../../services/statistics';
import { CompanyStatistics, ProductStatistics } from '../../types';
import CompanyStatisticsCard from './components/CompanyStatisticsCard';
import ProductStatisticsCard from './components/ProductStatisticsCard';
import PieChartCard from './components/PieChartCard';
import LatestItemsTable from './components/LatestItemsTable';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [companyStatistics, setCompanyStatistics] =
    useState<CompanyStatistics | null>(null);
  const [productStatistics, setProductStatistics] =
    useState<ProductStatistics | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyStats: CompanyStatistics =
          await statisticsService.getCompanyStatistics();
        const productStats: ProductStatistics =
          await statisticsService.getProductStatistics();
        setCompanyStatistics(companyStats);
        setProductStatistics(productStats);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const mergedData = [];
  const maxLength = Math.max(
    companyStatistics?.latestAddedCompanies.length || 0,
    productStatistics?.latestAddedProducts.length || 0
  );
  for (let i = 0; i < maxLength; i++) {
    mergedData.push({
      key: i,
      company: companyStatistics?.latestAddedCompanies[i] || '',
      product: productStatistics?.latestAddedProducts[i] || '',
    });
  }

  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-semibold mb-6'>Dashboard</h1>
      <Spin spinning={loading}>
        <Row gutter={16}>
          <CompanyStatisticsCard
            title='The number of companies in the system'
            value={companyStatistics?.numberOfCompanies || 0}
          />
          <CompanyStatisticsCard
            title='The number of companies added today'
            value={
              companyStatistics?.todaysAddedCompanies.length ||
              'Today, no companies have been added yet.'
            }
          />
        </Row>
        <Row gutter={16}>
          <ProductStatisticsCard
            title='The numbers of products in the system'
            value={productStatistics?.numberOfProducts || 0}
          />
          <ProductStatisticsCard
            title='The number of products added today'
            value={
              productStatistics?.todaysAddedProducts.length ||
              'Today, no products have been added yet.'
            }
          />
        </Row>
        <Row gutter={16} justify='center'>
          <PieChartCard
            title='The companies with the most products'
            data={Object.entries(
              companyStatistics?.sortedCompaniesByProductsCount || []
            )}
            dataKey='1'
            getRandomColor={getRandomColor}
          />
          <PieChartCard
            title='The categories with the most products'
            data={Object.entries(
              productStatistics?.sortedCategoriesByProductsCount || []
            )}
            dataKey='1'
            getRandomColor={getRandomColor}
          />
        </Row>
        <LatestItemsTable dataSource={mergedData} />
      </Spin>
    </div>
  );
};

export default HomePage;
