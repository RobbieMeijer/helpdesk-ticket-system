import React from 'react';
import NavigationLink from './NavigationLink';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavigationLink href="/">Dashboard</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/tickets">Tickets</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/customers">Customers</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/reports">Reports</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/knowledgebase">
              Knowledge base
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href="/search">Search</NavigationLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
