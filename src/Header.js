import { useAuth0 } from '@auth0/auth0-react'; // Import the useAuth0 hook

import React from 'react';

import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import './Header.css';
import AuthButtons from './auth/AuthButtons';

const Header = () => {
    const { isAuthenticated } = useAuth0(); // Call the useAuth0 hook to get the isAuthenticated variable

  return (
  <header className="bg-light">
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        <img className="logo" src='./images/logo.png' alt='logo' />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/About" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/CreateNew" className="nav-link">Create New</Link>
              </li>
              <li className="nav-item">
                <Link to="/Creations" className="nav-link">Creations</Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/Profile" className="nav-link">Profile</Link>
              </li> */}
              <AuthButtons />
            </>
          ) : (
            <AuthButtons />
          )}
        </ul>
      </div>
    </nav>
  </div>
</header>

  );
};

export default Header;


