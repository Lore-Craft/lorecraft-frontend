import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-ica04oplqpl6pm65.us.auth0.com"
    clientId="Wdkcz4CqU9CaM09tzypGKcfCePateomc"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
