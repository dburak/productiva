import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { message } from 'antd';

import Auth from './components/AuthPage/Auth';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './components/HomePage/HomePage';
import CompanyPage from './components/CompanyPage/CompanyPage';
import ProductPage from './components/ProductPage/ProductPage';

import { useAppDispatch, useAppSelector } from './hooks';
import { getReduxAuth } from './reducers/authReducer';

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login);

  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  console.log(user);

  useEffect(() => {
    messageApi.loading('Loading...');
    dispatch(getReduxAuth())
      .then(() => {
        setIsLoading(false);
        messageApi.destroy();
      })
      .catch(() => {
        messageApi.error('Error while loading. Please try again.');
      });
  }, [dispatch, messageApi]);

  return isLoading ? (
    <div>{contextHolder}</div>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/homepage' />} />
        <Route
          path='/auth'
          element={!user ? <Auth /> : <Navigate to='/homepage' />}
        />
        <Route element={<MainLayout />}>
          <Route
            path='/homepage'
            element={user ? <HomePage /> : <Navigate to='/auth' />}
          />
          <Route
            path='/companies'
            element={user ? <CompanyPage /> : <Navigate to='/auth' />}
          />
          <Route
            path='/products'
            element={user ? <ProductPage /> : <Navigate to='/auth' />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
