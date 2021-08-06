import React, { useState, useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import { useEasybase } from 'easybase-react';

const Profile = () => {
  // auth0 hook
  // const { user, isAuthenticated } = useAuth0();

  // state
  const [user, setUser] = useState(null);
  const [fullname, setFullname] = useState();

  //easybase hook
  const { isUserSignedIn, getUserAttributes } = useEasybase();

  const getUserData = async () => {
    const userData = await getUserAttributes();

    setUser(userData);
    setFullname(userData.fullName);

    console.log('userData: ', userData);
  };

  useEffect(() => {
    getUserData();
    console.log('user: ', user);
  }, []);

  const renderProfileContent = () => {
    // console.log('auth0 user object: ', user);

    return (
      // <div>
      //   <img src={user.picture} alt={user.name} />
      //   <h2>{user.nickname}</h2>
      //   <p>e-mail: {user.email}</p>
      //   <p>updated at: {user.updated_at}</p>
      //   <p>
      //     role: {''}
      //     {user['https://localhost:3000'] ? user['https://localhost:3000'][0]
      //       : null}
      //   </p>
      // </div>
      <div>
        {/* <img src={user.picture} alt={user.name} /> */}
        {/* <h2>{fullname}</h2> */}
        <h2>Hello {fullname}</h2>
        {/* <p>e-mail: {user.email}</p> */}
        {/* <p>updated at: {user.updated_at}</p> */}
      </div>
    );
  };

  return isUserSignedIn ? renderProfileContent() : 'Profile Component';
};

export default Profile;
