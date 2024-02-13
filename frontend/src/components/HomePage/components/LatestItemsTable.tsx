import { Card, Col, Table } from 'antd';

interface LatestItemsTableProps {
  dataSource: { key: number; company: string; product: string }[];
}

const LatestItemsTable: React.FC<LatestItemsTableProps> = ({ dataSource }) => (
  <Col span={24}>
    <Card title='Lastly added companies & products' className='mb-4'>
      <Table
        dataSource={dataSource}
        columns={[
          { title: 'Company', dataIndex: 'company', key: 'company' },
          { title: 'Product', dataIndex: 'product', key: 'product' },
        ]}
      />
    </Card>
  </Col>
);

export default LatestItemsTable;
