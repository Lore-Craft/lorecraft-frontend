import Header from './Header';

import { useAuth0 } from '@auth0/auth0-react'; // Import the useAuth0 hook




import './LoggedinComponent.css';



const LoggedInComponent = () => {
  
  const { isAuthenticated } = useAuth0(); // Call the useAuth0 hook to get the isAuthenticated variable

return (

<div className="main">
<Header />
<div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
  <div className="col-md-10">
    <div>
      {isAuthenticated ? (  // Conditionally render the navigation links based on isAuthenticated value
        <>
            <img src='./images/lorecraft.png' alt='logo' className='loggedinimage'  style={{ width: '400px', height: 'auto' }} />
        </>
      ) : (
        <div className="row">
          <div className="col-md-5">
            <img src='./images/lorecraftstart.png' alt='logo' className='loggedinimage' />
          </div>
          <div className="col-md-7">
            <p   style={{
                display: 'flex',
                border: '2px solid #6B4226',
                background: '#FEF3E2',
                padding: '20px',
                margin: '10px',
                fontFamily: 'Fantasy, cursive',
                fontSize: '18px',
                color: '#4E3629',
                position: 'relative',
              }}>
              Step into your valorous warrior persona with LoreCraft, where AI crafts epic tales and images based on your name, gender, and fierce personality. Sharpen your blade and ready your shield for a unique adventure that awaits you in a realm created just for you. Unleash the warrior within, as every battle cry and heroic deed is woven into a narrative that mirrors your might and mettle.
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
 </div>

  );
};

export default LoggedInComponent;
