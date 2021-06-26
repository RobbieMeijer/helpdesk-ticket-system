import React from 'react';
import NavigationLink from './NavigationLink';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</li>
          <li>
            <NavigationLink href="/profile">Profile</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/dashboard">Dashboard</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/tickets">Tickets</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/create-ticket">Create Ticket</NavigationLink>
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
