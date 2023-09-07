import Header from './Header';
import React, { useState, useEffect } from 'react';
import About from './About';
import CreateNew from './CreateNew';
import Creations from './Creations';
import Profile from './Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoggedinComponent from './LoggedinComponent';
import AuthButtons from './auth/AuthButtons';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function OLDoauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      'client_id': '818715484116-lk0u6hiqoi4s4rgt559pq7i3v7p06eep.apps.googleusercontent.com',  // Replace with your client ID
      'redirect_uri': 'http://localhost:3000/',  // Replace with your redirect URI
      'response_type': 'token',
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'include_granted_scopes': 'true',
      'state': 'pass-through value'
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
  function oauthSignIn() {
    console.log('deprecated function, check code');
  }


  useEffect(() => {
    // Check if the user is logged in by checking the URL for an access token
   // if (window.location.hash.includes('access_token')) {
      setIsLoggedIn(true);
   // }
  }, []);
  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <AuthButtons />
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/creations" element={<Creations />} />
              <Route path="/CreateNew" element={<CreateNew />} />
              <Route path="/" element={<LoggedinComponent />} />
            </Routes>
          </>
        ) : (
          <button onClick={OLDoauthSignIn}>Login with Google</button>
        )}
      </div>
    </Router>
  );
}

export default App;



