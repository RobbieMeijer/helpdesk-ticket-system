import React from 'react';
import NavigationLink from './NavigationLink';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  // redux state: current user
  const user = useSelector((state) => state.currentUser.payload);
  const { fullName } = user;

  return (
    <div>
      <h5 className="mb-4">{fullName}</h5>
      <nav>
        <ul>
          <li>
            <NavigationLink href="/dashboard">Dashboard</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/profile">Profile</NavigationLink>
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
            <NavigationLink href="/search">Search</NavigationLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
