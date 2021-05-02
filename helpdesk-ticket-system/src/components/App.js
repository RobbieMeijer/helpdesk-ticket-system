import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Sidebar />
        </div>
        <div className="col">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default App;
