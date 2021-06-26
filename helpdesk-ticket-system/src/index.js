import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './components/App';
import reducers from './reducers';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);
