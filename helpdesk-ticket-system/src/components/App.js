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
        margin: 0;
        padding: 1rem;
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
        `}
      >
        <aside
          css={css`
            max-width: 200px;
          `}
        >
          <Sidebar />
        </aside>
        <main>
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
    </div>
  );
};

export default App;
