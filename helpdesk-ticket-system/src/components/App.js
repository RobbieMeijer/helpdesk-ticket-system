import React from 'react';
import Dashboard from './Dashboard';
import Route from './Route';
import Sidebar from './Sidebar';
import TicketList from './TicketList';
import Customers from './Customers';
import Search from './Search';
import CreateTicket from './CreateTicket';
import Profile from './Profile';

/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

const App = () => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(210px, max-content));
        height: 100vh;
        margin: 0;
      `}
    >
      <aside
        css={css`
          max-width: 200px;
          background-color: #3391ff;
          margin-top: 3.5rem;
        `}
      >
        <Sidebar />
      </aside>
      <main
        css={css`
          padding: 1rem 1.25rem;
          font-size: 14px;
        `}
      >
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/tickets">
          <TicketList />
        </Route>
        <Route path="/create-ticket">
          <CreateTicket />
        </Route>
        <Route path="/customers">
          <Customers />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </main>
    </div>
  );
};

export default App;
