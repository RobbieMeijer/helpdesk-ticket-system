import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { EasybaseProvider } from 'easybase-react';
import ebconfig from './ebconfig';

import App from './components/App';
import reducers from './reducers';
import Authentication from './components/Authentication';

/** @jsx jsx */ /** @jsxRuntime classic */ import {
  Global,
  jsx,
  css,
} from '@emotion/react';

ReactDOM.render(
  <>
    <Global
      styles={css`
        * {
          font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        }

        .button {
          cursor: pointer;
          display: inline-block;
          min-height: 1rem;
          outline: 0;
          border: none;
          vertical-align: baseline;
          background: #e0e1e2 none;
          color: rgba(0, 0, 0, 0.6);
          font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          margin: 0 0.25em 0 0;
          padding: 0.78571429em 1.5em 0.78571429rem;
          text-transform: none;
          text-shadow: none;
          font-weight: 700;
          line-height: 1rem;
          font-style: normal;
          text-align: center;
          text-decoration: none;
          border-radius: 0.28571429rem;
          box-shadow: 0 0 0 1px transparent inset,
            0 0 0 0 rgba(34, 36, 38, 0.15) inset;
          user-select: none;
          transition: opacity 0.1s ease, background-color 0.1s ease,
            color 0.1s ease, background 0.1s ease;
          transition: opacity 0.1s ease, background-color 0.1s ease,
            color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
          transition: opacity 0.1s ease, background-color 0.1s ease,
            color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
          will-change: '';
        }

        .input {
          position: relative;
          font-weight: 400;
          font-style: normal;
          display: inline-flex;
          color: rgba(0, 0, 0, 0.87);
          margin: 0;
          max-width: 100%;
          flex: 1 0 auto;
          outline: 0;
          text-align: left;
          line-height: 1.21428571rem;
          font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          padding: 0.67857143em 1rem;
          background: #fff;
          border: 1px solid rgba(34, 36, 38, 0.15);
          color: rgba(0, 0, 0, 0.87);
          border-radius: 0.28571429rem;
          transition: border-color 0.1s ease;
          transition: box-shadow 0.1s ease, border-color 0.1s ease;
          transition: box-shadow 0.1s ease, border-color 0.1s ease;
          box-shadow: none;
        }

        .field {
          display: flex;
          align-items: baseline;
          font-size: 1rem;
          clear: both;
          margin: 0 0 1rem;

          label {
            display: inline-block;
            width: 95px;
            margin: 0 1rem 0 0;
            vertical-align: baseline;
            font-size: 0.92857143rem;
            font-weight: 700;
            text-transform: none;
          }
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
