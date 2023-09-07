import Header from './Header';
import React from 'react';
import './About.css';

function About() {
  const profiles = [
    { name: "Person 1", info: "Info about person 1", imgSrc: "./images/Profile1.png" },
    { name: "Person 2", info: "Info about person 2", imgSrc: "./images/Profile2.png" },
    { name: "Person 3", info: "Info about person 3", imgSrc: "./images/Profile3.png" },
  ];

  return (
    <div>
    <Header />
    <div className="container">
         <div className="row">
      <div className="col-md-10">
      <div style={{ border: '1px solid #000', background:'#fff', padding: '10px', boxShadow: '0px 0px 10px #000', maxWidth: '100%', margin: '0 auto' }}>
   

      {profiles.map((profile, index) => (
        <div key={index} className="profile">
          <img src={profile.imgSrc} alt={profile.name} />
          <h2>{profile.name}</h2>
          <textarea value={profile.info} readOnly />
        </div>
      ))}    </div>    </div>    </div>
    </div></div>
  );
}

export default About;
