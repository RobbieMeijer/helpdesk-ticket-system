import React from 'react';
import Dashboard from './Dashboard';
import Route from './Route';
import Sidebar from './Sidebar';
import TicketList from './TicketList';
import Customers from './Customers';
import Reports from './Reports';
import KnowledgeBase from './KnowledgeBase';
import Search from './Search';
import CreateTicket from './CreateTicket';
import Profile from './Profile';
import Ticket from './Ticket';

const App = () => {
  return (
    <div className="">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
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
        </div>
      </div>
    </div>
  );
};

export default App;
