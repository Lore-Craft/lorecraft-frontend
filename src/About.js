import Header from './Header';
import React from 'react';
import './About.css';

function About() {
  const profiles = [
    { name: "Nika Skeba", info: "AI Artist, Coding, Design", imgSrc: "./images/Profile1.png" },
    { name: "Paul Brown", info: "Engineer --> Entrepreneur --> Engineer!", imgSrc: "./images/Profile2.png" },
    { name: "Ekaterina Khoroshilova", info: "Software Developer | Code Fellows Student", imgSrc: "./images/Profile3.png" },
  ];

  return (
    <div>
      <Header />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} className="row">
            <div className="col-md-10">
              <div
                style={{
                  border: '1px solid #000',
                  background: '#fff',
                  padding: '10px',
                  boxShadow: '0px 0px 10px #000',
                  maxWidth: '100%',
                  margin: '0 auto',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {profiles.map((profile, index) => (
                    <div
                      key={index}
                      style={{
                        flex: '0 0 calc(33.33% - 20px)',
                        border: '2px solid #6B4226',
                        background: '#FEF3E2',
                        padding: '20px',
                        margin: '10px',
                        fontFamily: 'Fantasy, cursive',
                        fontSize: '16px',
                        color: '#4E3629',
                        position: 'relative',
                      }}
                    >
                      <div style={{ marginLeft: '20px' }}>
                        <img
                          src={profile.imgSrc}
                          alt={profile.name}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            marginBottom: '10px',
                            border: '1px solid #6B4226',
                          }}
                        />
                        <h2>{profile.name}</h2>
                        <textarea
                          value={profile.info}
                          readOnly
                          style={{
                            background: 'transparent',
                            border: 'none',
                            resize: 'none',
                            width: '100%',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default About;
