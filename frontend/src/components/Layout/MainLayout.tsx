import { useState } from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import CustomHeader from './components/Header';

const { Sider, Header, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        className='h-screen sticky left-0 bottom-0 top-0'
        theme='light'
        trigger='null'
        collapsed={collapsed}
      >
        <Sidebar collapsed={collapsed} />
        <Button
          className='fixed w-12 h-12 bottom-3 left-3'
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        ></Button>
      </Sider>
      <Layout>
        <Header className='flex pt-3 bg-primary'>
          <CustomHeader />
        </Header>
        <Content className='my-6 mx-4'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
