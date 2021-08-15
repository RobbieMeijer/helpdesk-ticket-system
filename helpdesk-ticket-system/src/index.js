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

// css variables
const border = `1px solid #22242626`;
const cursor = `pointer`;
const color = `rgba(0, 0, 0, 0.87)`;
const outline = `0`;
const verticalAlign = `baseline`;
const grey = `rgba(34, 36, 38, 0.15)`;
const blue = `#3391ff`;
const transition = `.2s ease-in-out`;

ReactDOM.render(
  <>
    <Global
      styles={css`
        * {
          font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        }

        p {
          line-height: 1.25rem;
          margin-bottom: 2rem;
        }

        button,
        input,
        optgroup,
        select,
        textarea {
          font-size: 14px;
        }

        button {
          cursor: ${cursor};
          display: inline-block;
          min-height: 1rem;
          outline: ${outline};
          border: none;
          vertical-align: ${verticalAlign};
          background: #e0e1e2 none;
          color: rgba(0, 0, 0, 0.6);
          font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          margin: 0 0.25rem 0 0;
          padding: 0.75rem 1.5rem 0.75rem;
          text-transform: none;
          text-shadow: none;
          font-weight: 700;
          line-height: 1rem;
          font-style: normal;
          text-align: center;
          text-decoration: none;
          border-radius: 0.25rem;
          box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 ${grey} inset;
          user-select: none;

          &:active,
          &focus {
            transition: background-color ${transition};
            transform: scale(0.97);
            background-color: #babbbc;
          }
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
          vertical-align: ${verticalAlign};
          text-transform: none;
        }

        input,
        select,
        textarea {
          position: relative;
          font-weight: 400;
          font-style: normal;
          display: block;
          color: ${color};
          margin: 0;
          min-width: 209px;
          width: calc(100% - 9rem);
          max-width: 100%;
          flex: 1 0 auto;
          outline: ${outline};
          text-align: left;
          line-height: 1.25rem;
          font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          padding: 0.65rem 1rem;
          background: #fff;
          border: 1px solid ${grey};
          color: ${color};
          border-radius: 0.25rem;
          box-shadow: none;

          &:active,
          &:focus {
            border-color: ${blue};
          }
        }

        select {
          cursor: ${cursor};
        }

        textarea {
          margin-bottom: 1rem;
        }

        table {
          width: 100%;
          background: #fff;
          margin: 1em 0;
          margin-top: 1rem;
          box-shadow: none;
          text-align: left;
          color: #000000de;
          border-collapse: separate;
          border-spacing: 0;

          thead {
            th {
              cursor: auto;
              background: #f9fafb;
              text-align: inherit;
              color: #000000de;
              padding: 0.92857143em 0.78571429em;
              vertical-align: top;
              font-style: none;
              font-weight: 700;
              text-transform: none;
              border-bottom: ${border};
            }
          }
          tbody {
            tr {
              &:first-child td {
                border-top: none;
              }

              &:nth-child(2n) {
                background-color: #00003205;
              }

              &:hover,
              &:active,
              &:focus {
                background-color: #3391ff14;
                cursor: ${cursor};
              }
            }

            td {
              padding: 0.78571429em 0.78571429em;
              text-align: inherit;
              border-top: ${border};
              vertical-align: top;
            }
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
