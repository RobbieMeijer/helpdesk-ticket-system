import React, { useEffect, useState } from 'react';
import { useEasybase } from 'easybase-react';

import NavigationLink from './NavigationLink';

const Sidebar = () => {
  // current user state
  const [fullname, setFullname] = useState('');

  // easybase hooks
  const { getUserAttributes } = useEasybase();

  // user date must be retrieved from redux later on
  const getUserData = async () => {
    const userData = await getUserAttributes();

    setFullname(userData.fullName);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="sidebar">
      <p>{fullname}</p>
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
