import Header from './Header';
import { useCallback, useEffect,useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal'; // Import Modal component


const SERVER_URL='https://lorecraft.onrender.com'
// const SERVER_URL='http://localhost:3001'

const Creations = () => {
const { user, getIdTokenClaims } = useAuth0();
  const [editingCharacter, setEditingCharacter] = useState(null);
const { getAccessTokenSilently } = useAuth0();

  const [characters, setCharacters] = useState([]);

const fetchAllCharacters = useCallback(async () => {
  try {
    const tokenClaims = await getIdTokenClaims();
    const token = tokenClaims.__raw;

    const response = await axios.get(`${SERVER_URL}/character/${user.email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setCharacters(response.data);
    }
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
}, [user.email, getIdTokenClaims]);
useEffect(() => {
  fetchAllCharacters();
}, [fetchAllCharacters]);
const handleEditClick = async (userEmail, updatedCharacterData) => {
  try {
    const { charName, classType, ...idData } = updatedCharacterData;
    const id = Object.values(idData).join('');

    const characterData = {
      id,
      charName,
      classType,
    };

    console.log('Data to be sent:', { characters: [characterData] });

    // Send a PATCH request to the server with the correct data structure
    const response = await axios.patch(`${SERVER_URL}/character/${userEmail}`, { characters: [characterData] }, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
    });



    if (response.status === 200) {
      console.log('Character updated successfully');
      // ... (other success handling code)
    } else if (response.status === 404) {
      console.error('User with that email address not found');
      // ... (handle user not found error)
    } else {
      console.error('Failed to update character');
      // ... (other error handling code)
    }
    // Refresh the character list after update
    fetchAllCharacters();
  } catch (error) {
    console.error('Error updating character:', error);
    // ... (other error handling code)
  }
};


const handleDeleteClick = async (characterId) => {
  
try {
    const token = await getAccessTokenSilently(); // Get the token

    // Send a DELETE request to the server with the character ID in the URL
    const response = await axios.delete(`${SERVER_URL}/character/${characterId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      console.log('Character deleted successfully');
      // ... (other success handling code)
    } else if (response.status === 404) {
      console.error('Character not found');
      // ... (handle character not found error)
    } else {
      console.error('Failed to delete character');
      // ... (other error handling code)
    }
    // Refresh the character list after deletion
    fetchAllCharacters();
  } catch (error) {
    console.error('Error deleting character:', error);
    // ... (other error handling code)
  }
};

return (
  <div>
    <Header />
    {characters.length === 0 ? (
      <p>No characters found</p>
    ) : (
      <Carousel>
        {characters.map((character, index) => (
          <Carousel.Item key={index}>
            <div
              style={{
                display: 'flex',
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
              <div style={{ flex: 1, marginLeft: '20px' }}>
                {character.imageURL && (
                  <img
                  src={character.imageURL}
                    alt="Character"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      marginBottom: '10px',
                      border: '1px solid #6B4226',
                    }}
                  />
                )}
                <div style={{ flex: 2, marginTop: '10px' }}>
                  <h5 style={{ marginBottom: '10px', color: '#B14D09' }}>
                    <strong> {character.charName}</strong>{' '}
                  </h5>
                  <p>
                    <strong>Race:</strong> {character.race}
                  </p>
                  <p>
                    <strong>Class:</strong> {character.classType}
                  </p>
                  <p>
                    <strong>Alignment:</strong> {character.alignment}
                  </p>
                  <p>
                    <strong>Gender:</strong> {character.gender}
                  </p>
                </div>
              </div>
              {/* Backstory */}
              <div style={{ flex: 3, marginTop: '50px', marginRight: '30px' }}>
                <h6 style={{ color: '#B14D09' }}>
                  <strong>Backstory:</strong>
                </h6>
                <p
                  style={{
                    whiteSpace: 'pre-line',
                    fontSize: '14px',
                  }}
                >
                  {character.backstory}
                </p>
                {/* Edit and Delete Buttons */}
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                {/*   <button
                    style={{
                      backgroundColor: '#B14D09',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      cursor: 'pointer',
                      marginRight: '10px',
                      fontFamily: 'Fantasy, cursive',
                      fontSize: '14px',
                    }}
                    onClick={() => handleEditButtonClick(character)}
                  >
                    Edit
                  </button>*/}
                  <button
                    style={{
                      backgroundColor: '#6B4226',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Fantasy, cursive',
                      fontSize: '14px',
                    }}
                    onClick={() => handleDeleteClick(character._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    )}
    {editingCharacter && (
      <Modal show={!!editingCharacter} onHide={() => setEditingCharacter(null)}>
        <Modal.Header closeButton>
        <Modal.Title style={{ color: '#B14D09',  fontFamily: 'Fantasy, cursive', }}>Edit Character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: 'flex',
              border: '2px solid #6B4226',
              background: '#FEF3E2',
              padding: '20px',
              margin: '10px',
              fontFamily: 'Fantasy, cursive',
              fontSize: '16px',
              color: '#4E3629',
              flexDirection: 'column', 
            }}
          >
            {/* Editable fields for character details */}
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label htmlFor="charName">Character Name:</label>
              <input
                type="text"
                id="charName"
                value={editingCharacter.charName}
                onChange={(e) => {
                  // Update the character's name in the editingCharacter state
                  setEditingCharacter({
                    ...editingCharacter,
                    charName: e.target.value,
                  });
                }}
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid #6B4226',
                  borderRadius: '5px',
                  fontFamily: 'Fantasy, cursive',
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label htmlFor="classType">Class Type:</label>
              <input
                type="text"
                id="classType"
                value={editingCharacter.classType}
                onChange={(e) => {
                  // Update the character's class type in the editingCharacter state
                  setEditingCharacter({
                    ...editingCharacter,
                    classType: e.target.value,
                  });
                }}
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid #6B4226',
                  borderRadius: '5px',
                  fontFamily: 'Fantasy, cursive',
                  fontSize: '14px',
                }}
              />
            </div>
            {/* Repeat the above pattern for other character details (alignment, gender, imageURL, backstory) */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              style={{
                backgroundColor: '#B14D09',
                color: '#fff',
                padding: '5px 10px',
                border: 'none',
                cursor: 'pointer',
                marginRight: '10px',
                fontFamily: 'Fantasy, cursive',
                fontSize: '14px',
              }}
              onClick={() => handleEditClick(user.email, editingCharacter)}
            >
              Edit
            </button>
            <button
              style={{
                backgroundColor: '#6B4226',
                color: '#fff',
                padding: '5px 10px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Fantasy, cursive',
                fontSize: '14px',
              }}
              onClick={() => setEditingCharacter(null)}
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    )}
  </div>
);
};

export default Creations;