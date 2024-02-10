import { Flex, Menu } from 'antd';
import { FaProductHunt } from 'react-icons/fa6';
import { TfiViewGrid } from 'react-icons/tfi';
import { BsBuildings, BsBasket } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setReduxLogout } from '../../../reducers/authReducer';
import { useAppDispatch } from '../../../hooks';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [selectedKey, setSelectedKey] = useState('1');

  /** 
    This logic is used to set the selected key in the sidebar based on the current location.
    For example, if you change the location to '/companies' from browser manually, the selected key will be set to '2'.

    The actual purpose of this logic is to highlight the current page in the sidebar,
    Even if you change the location to '/companies' from browser manually, the 'Companies' in the sidebar will be highlighted.
  */
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/homepage':
        setSelectedKey('1');
        break;
      case '/companies':
        setSelectedKey('2');
        break;
      case '/products':
        setSelectedKey('3');
        break;
      default:
        setSelectedKey('1');
        break;
    }
  }, [location]);

  const handleLogout = () => {
    dispatch(setReduxLogout());
  };

  return (
    <>
      <Flex justify='center'>
        <div className='text-primary mt-8 mb-24 text-2xl'>
          <div className='flex items-center justify-center gap-2'>
            <FaProductHunt />
            {!collapsed && <span>Productiva</span>}
          </div>
        </div>
      </Flex>
      <Menu
        className='flex flex-col gap-4 font-medium'
        mode='inline'
        selectedKeys={[selectedKey]}
        items={[
          {
            key: '1',
            icon: <TfiViewGrid />,
            label: <Link to='/homepage'>Homepage</Link>,
          },
          {
            key: '2',
            icon: <BsBuildings />,
            label: <Link to='/companies'>Companies</Link>,
          },
          {
            key: '3',
            icon: <BsBasket />,
            label: <Link to='/products'>Products</Link>,
          },
          {
            key: '4',
            icon: <CiLogout />,
            label: <p onClick={handleLogout}>Logout</p>,
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
