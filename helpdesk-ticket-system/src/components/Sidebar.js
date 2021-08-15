/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useEasybase } from 'easybase-react';

import NavigationLink from './NavigationLink';

// css variables
const icon = css`
  width: 1.5rem;
  font-size: 1rem;
  top: 2px;
`;
const breakpoints = [420, 768, 992, 1200];
const mediaQuery = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

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
    <div
      css={css`
        margin: 0;
        padding-left: 1rem;
        font: normal 100 1.25rem /1.5 'Roboto', sans-serif;
        color: #ffffff;

        ${mediaQuery[0]} {
          position: fixed;
        }
      `}
    >
      <p
        css={css`
          font-weight: 400;
        `}
      >
        {fullname}
      </p>
      <nav>
        <ul
          css={css`
            padding: 0;
            list-style: none;
          `}
        >
          <li>
            <NavigationLink href="/dashboard">
              <i
                className="fa fa-dashboard"
                css={css`
                  ${icon}
                `}
              ></i>
              Dashboard
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href="/profile">
              <i
                className="fa fa-user-circle-o"
                css={css`
                  ${icon}
                `}
              ></i>
              Profile
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href="/tickets">
              <i
                className="fa fa-ticket"
                css={css`
                  ${icon}
                `}
              ></i>
              Tickets
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href="/create-ticket">
              <i
                className="fa fa-plus"
                css={css`
                  ${icon}
                `}
              ></i>
              Create Ticket
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href="/customers">
              <i
                className="fa fa-group"
                css={css`
                  ${icon}
                `}
              ></i>
              Customers
            </NavigationLink>
          </li>
          <li>
            <NavigationLink href="/search">
              <i
                className="fa fa-search"
                css={css`
                  ${icon}
                `}
              ></i>
              Search
            </NavigationLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
