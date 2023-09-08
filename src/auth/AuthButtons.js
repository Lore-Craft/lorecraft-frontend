import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from "./Login";
import Logout from "./Logout";

function AuthButtons() {

  const {
    isAuthenticated,
  } = useAuth0();
  console.log('User authenticated?', isAuthenticated);

  return isAuthenticated ? <Logout /> : <Login />
}

export default AuthButtons;