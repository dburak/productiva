import { Flex, Typography } from 'antd';

function CustomHeader() {
  return (
    <Flex align='center'>
      <Typography.Title level={3} type='secondary'>
        Welcome, Burak Diker
      </Typography.Title>
    </Flex>
  );
}

export default CustomHeader;
