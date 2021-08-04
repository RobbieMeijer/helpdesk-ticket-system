import React from 'react'
import { useEasybase } from 'easybase-react';


const SignOutButton = () => {
  const {signOut} = useEasybase();

  return (
    <button onClick={signOut}>Sign Out</button>
  );
};

export default SignOutButton;
