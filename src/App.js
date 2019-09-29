import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'config/ReactotronConfig';
import Header from 'components/Header';
import GlobalStyles from 'styles/global';
import history from 'services/history';
import store from 'store';
import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <HashRouter history={history}>
      <Header />
      <Routes />
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
    </HashRouter>
  </Provider>
);

export default App;
