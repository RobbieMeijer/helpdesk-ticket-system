import React from 'react';
import Dashboard from './Dashboard';
import Route from './Route';
import Sidebar from './Sidebar';
import TicketList from './TicketList';
import Customers from './Customers';
import Search from './Search';
import CreateTicket from './CreateTicket';
import Profile from './Profile';

const App = () => {
  return (
    <div className="md:flex">
      <aside className="px-5 pb-5 mt-16 bg-green-300 md:block md:w-52 md:h-screen md:fixed">
        <Sidebar />
      </aside>
      <main className="p-5 md:ml-52">
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
