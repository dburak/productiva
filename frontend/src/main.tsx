import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Auth from './components/AuthPage/Auth';

import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
]);

const theme = {
  token: {
    colorPrimary: '#347768',
    colorLink: '#347768',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
