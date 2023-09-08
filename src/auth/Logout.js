import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {

  const {
    isAuthenticated,
    logout
  } = useAuth0();

  function handleLogout() {
    logout({ returnTo: 'https://www.example.com' });
  }

  return isAuthenticated &&
    <button style={{fontWeight: 'bolder'}} onClick={handleLogout}>LOG OUT</button>
    ;
}

export default LogoutButton;