import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'config/ReactotronConfig';
import Header from 'components/Header';
import GlobalStyles from 'styles/global';
import history from 'services/history';
import store from 'store';
import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Header />
      <Routes />
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
    </Router>
  </Provider>
);

export default App;
