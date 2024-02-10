import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

const theme = {
  token: {
    colorPrimary: '#347768',
    colorLink: '#347768',
  },
  components: {
    Menu: {
      itemSelectedBg: '#347768',
      itemSelectedColor: '#ffff',
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </Provider>
);
