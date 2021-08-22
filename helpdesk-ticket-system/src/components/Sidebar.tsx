import React, { useEffect, useState } from 'react';
import { useEasybase } from 'easybase-react';
import { useSelector } from 'react-redux';

import NavigationLink from './NavigationLink';

const Sidebar = () => {
  // useSelector: extract data from the Redux store state
  const userStore = useSelector((state) => state.user);

  // easybase hooks
  const { getUserAttributes } = useEasybase();

  // user date must be retrieved from redux later on
  // const getUserData = async () => {
  //   const userData = await getUserAttributes();

  //   console.log('userData from eb: ', userData);
  // };

  useEffect(() => {
    // getUserData();
  }, []);

  return (
    <div>
      <p className="mb-4">{userStore.fullname}</p>
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
