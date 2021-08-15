import 'normalize.css';
/** @jsx jsx */ /** @jsxRuntime classic */
import { Global, jsx, css } from '@emotion/react';

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
  <>
    <Global
      styles={css`
        * {
          font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        }

        button {
          cursor: pointer;
          display: inline-block;
          min-height: 1rem;
          outline: 0;
          border: none;
          vertical-align: baseline;
          background: #e0e1e2 none;
          color: rgba(0, 0, 0, 0.6);
          font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          margin: 0 0.25rem 0 0;
          padding: 0.75rem 1.5rem 0.75rem;
          text-transform: none;
          text-shadow: none;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1rem;
          font-style: normal;
          text-align: center;
          text-decoration: none;
          border-radius: 0.25rem;
          box-shadow: 0 0 0 1px transparent inset,
            0 0 0 0 rgba(34, 36, 38, 0.15) inset;
          user-select: none;
        }

        .field {
          display: flex;
          align-items: baseline;
          clear: both;
          margin: 0 0 1rem;
        }

        label {
          display: inline-block;
          min-width: 80px;
          width: 20%;
          margin: 0 1rem 0 0;
          vertical-align: baseline;
          font-size: 1rem;
          text-transform: none;
        }

        input,
        select,
        textarea {
          font-size: 1rem;
          position: relative;
          font-weight: 400;
          font-style: normal;
          display: block;
          color: rgba(0, 0, 0, 0.87);
          margin: 0;
          min-width: 209px;
          width: calc(100% - 9rem);
          max-width: 100%;
          flex: 1 0 auto;
          outline: 0;
          text-align: left;
          line-height: 1.25rem;
          font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          padding: 0.65rem 1rem;
          background: #fff;
          border: 1px solid rgba(34, 36, 38, 0.15);
          color: rgba(0, 0, 0, 0.87);
          border-radius: 0.25rem;
          box-shadow: none;
        }
      `}
    />
    <Provider store={createStore(reducers)}>
      <EasybaseProvider ebconfig={ebconfig}>
        <Authentication>
          <App />
        </Authentication>
      </EasybaseProvider>
    </Provider>
  </>,
  document.getElementById('root')
);
