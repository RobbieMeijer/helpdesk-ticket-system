import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  // sending action to store
  const dispatch = useDispatch();

  const { logout } = useAuth0();

  useEffect(() => {
    dispatch({
      type: 'SYSTEM_USER',
      payload: {
        loggedIn: true,
      },
    });
  }, []);

  return (
    <button
      onClick={() => {
        logout();
      }}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
