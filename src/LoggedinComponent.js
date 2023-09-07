import Header from './Header';
import About from './About';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './LoggedinComponent.css';
import axios from 'axios';
const pattern_with_prefix = /(.*?)\(([^()]+)\)([^()]+)\(([^()]+)\)/;


const LoggedInComponent = () => {
  







return (

      <div className="main">
<Header />
<div className="container">
         <div className="row">
      <div className="col-md-5">
            <div style={{ border: '1px solid #000', background:'#fff', padding: '10px', boxShadow: '0px 0px 10px #000', maxWidth: '100%', margin: '0 auto' }}>

<img src='./images/lorecraft.png' alt='logo' className='loggedinimage'/>
    </div>  </div>  </div>  </div> </div>

  );
};

export default LoggedInComponent;
