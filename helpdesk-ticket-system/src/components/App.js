import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <div className="container">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default App;
