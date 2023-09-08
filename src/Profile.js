import Header from './Header';

import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
     const { user} = useAuth0();
return (

      <div className="main">
<Header />
          <div style={{ border: '1px solid #000',background:'#fff',  padding: '10px', boxShadow: '0px 0px 10px #000', maxWidth: '400px', margin: '0 auto' }}>

        {user ? (
          <p><h2>{user.name}</h2>{user.email} </p>
         
        ) : (
          <p>User not logged in</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

