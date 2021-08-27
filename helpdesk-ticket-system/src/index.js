import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig';
import Authentication from './components/Authentication';

import './index.css';
import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <EasybaseProvider ebconfig={ebconfig}>
      <Authentication>
        <App />
      </Authentication>
    </EasybaseProvider>
  </Provider>,
  document.getElementById('root')
);
