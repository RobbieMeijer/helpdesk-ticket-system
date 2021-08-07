import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig';

import App from './components/App';
import reducers from './reducers';
import Authentication from './components/Authentication';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <EasybaseProvider ebconfig={ebconfig}>
      <Authentication>
        <App />
      </Authentication>
    </EasybaseProvider>
  </Provider>,
  document.getElementById('root')
);
