import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  // auth0 hook
  const { user, isAuthenticated } = useAuth0();

  const renderContent = () => {
    console.log('auth0 user object: ', user);

    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>e-mail: {user.email}</p>
        <p>updated at: {user.updated_at}</p>
      </div>
    );
  };

  return isAuthenticated ? renderContent() : 'Profile Component';
};

export default Profile;
