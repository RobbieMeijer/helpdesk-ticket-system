import React from 'react';
import Dashboard from './Dashboard';
import Route from './Route';
import Sidebar from './Sidebar';
import Tickets from './Tickets';
import Customers from './Customers';
import Reports from './Reports';
import KnowledgeBase from './KnowledgeBase';
import Search from './Search';
import CreateTicket from './CreateTicket';

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="/tickets">
            <Tickets />
          </Route>
          <Route path="/create-ticket">
            <CreateTicket />
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/reports">
            <Reports />
          </Route>
          <Route path="/knowledgebase">
            <KnowledgeBase />
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
