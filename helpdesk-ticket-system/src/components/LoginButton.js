import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  // sending action to store
  const dispatch = useDispatch();

  const { loginWithRedirect } = useAuth0();

  // hook that extracts data from the redux store
  const systemUser = useSelector((state) => state.systemUser);

  useEffect(() => {
    dispatch({
      type: 'SYSTEM_USER',
      payload: {
        loggedIn: false,
      },
    });

    console.log('systemUser: ', systemUser);
  }, []);

  return (
    <button
      onClick={() => {
        loginWithRedirect();
      }}
    >
      Log in
    </button>
  );
};

export default LoginButton;
