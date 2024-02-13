import { Card, Col } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

interface PieChartCardProps {
  title: string;
  data: [string, number][];
  dataKey: string;
  getRandomColor: () => string;
}

const PieChartCard: React.FC<PieChartCardProps> = ({
  title,
  data,
  dataKey,
  getRandomColor,
}) => {
  /**
   * Determines whether to render the chart based on the data values.
   * If none of the created companies have at least one product, the chart should not be rendered.
   * Otherwise, if at least one company has at least one product, the chart should be rendered.
   * @type {boolean}
   */
  const shouldRenderChart: boolean = !data.every(([, value]) => value === 0);

  return (
    <Col span={12}>
      <Card title={title} className='mb-4' extra={<PieChartOutlined />}>
        <div className='flex items-center justify-center'>
          {shouldRenderChart ? (
            <PieChart width={500} height={300}>
              <Pie
                data={data.map(([name, value]) => ({
                  name,
                  [dataKey]: value,
                }))}
                dataKey={dataKey}
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={100}
                label
              >
                {data.map(([name]) => (
                  <Cell key={name} fill={getRandomColor()} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            'No data to display'
          )}
        </div>
      </Card>
    </Col>
  );
};

export default PieChartCard;
