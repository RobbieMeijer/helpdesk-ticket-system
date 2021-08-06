import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import { Auth0Provider } from '@auth0/auth0-react';
import { EasybaseProvider, Auth } from 'easybase-react';
import ebconfig from './ebconfig';

import App from './components/App';
import reducers from './reducers';
import Authentication from './components/Authentication';

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  // <Auth0Provider
  //   domain={domain}
  //   clientId={clientId}
  //   redirectUri={window.location.origin}
  // >
  <Provider store={createStore(reducers)}>
    <EasybaseProvider ebconfig={ebconfig}>
      <Authentication>
        <App />
      </Authentication>
    </EasybaseProvider>
  </Provider>,
  // <Auth0Provider>
  document.getElementById('root')
);
