import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {

  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  function handleLogin() {
    loginWithRedirect();
  }

  return !isAuthenticated &&
    <button style={{fontWeight: 'bolder'}}onClick={handleLogin}>LOG IN</button>
    ;
}
export default Login;