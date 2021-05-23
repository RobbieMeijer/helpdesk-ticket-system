import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
// import rootReducer from './reducers/combineReducers';
import { Provider } from 'react-redux';
import { ticketReducer } from './reducers/ticketReducer';

const store = createStore(ticketReducer);

ReactDOM.render(
  // <Provider store={store}>
  <App />,
  // </Provider>
  document.getElementById('root')
);
