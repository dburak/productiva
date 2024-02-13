import { Card, Col } from 'antd';

interface ProductStatisticsCardProps {
  title: string;
  value: number | string;
}

const ProductStatisticsCard: React.FC<ProductStatisticsCardProps> = ({
  title,
  value,
}) => (
  <Col span={12}>
    <Card title={title} className='mb-4 bg-white'>
      <div className='text-xl text-primary text-center font-bold'>{value}</div>
    </Card>
  </Col>
);

export default ProductStatisticsCard;
