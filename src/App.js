import Header from './Header';
import React, { useState, useEffect, Component } from 'react';
import About from './About';
import CreateNew from './CreateNew';
import Creations from './Creations';
import Profile from './Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoggedinComponent from './LoggedinComponent';
import AuthButtons from './auth/AuthButtons';

import { withAuth0 } from '@auth0/auth0-react';


const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_IMAGE_API_ENDPOINT = 'https://api.openai.com/v1/images/generations';
const OPENAI_MODEL = 'gpt-3.5-turbo-0613';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  oauthSignIn = () => {
    console.log('deprecated function, check code');
  }

  componentDidMount() {
    // Check if the user is logged in by checking the URL for an access token
    // if (window.location.hash.includes('access_token')) {
      this.setState({ isLoggedIn: true });
    // }
  }

  render() {
    const { isLoggedIn } = this.state;
    const { auth0 } = this.props;

    return (
      <Router>
        <div className="App">
          {isLoggedIn ? (
            <>
          
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/creations" element={<Creations />} />
                <Route path="/CreateNew" element={<CreateNew />} />
                <Route path="/" element={<LoggedinComponent />} />
              </Routes>
            </>
          ) : (
           'HELLO'
          )}V
        </div>
      </Router>
    );
  }
}

export default withAuth0(App);
