import Header from './Header';



import 'bootstrap/dist/css/bootstrap.min.css';
/* eslint-disable no-unused-vars */
import React, { useState, useEffect,useCallback } from 'react';
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_IMAGE_API_ENDPOINT = 'https://api.openai.com/v1/images/generations';
const OPENAI_MODEL = 'gpt-3.5-turbo-0613';
const SERVER_URL='https://lorecraft.onrender.com'
// const SERVER_URL='http://localhost:3001'

function CreateNew() {
    const { user, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [generatedImage, setGeneratedImage] = React.useState(""); // Assuming this is a state variable, initialize it accordingly

/* eslint-disable no-unused-vars */
  const [token, setToken] = useState(null);
/* eslint-disable no-unused-vars */
  useEffect(() => {
    const getToken = async () => {
      let res = await getIdTokenClaims();
      const token = res.__raw;
      setToken(token);

      // Now you can use the token to make an authenticated API request
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
        baseURL: SERVER_URL,
        url: '/character',
      };

      const response = await axios(config);
      console.log('The Server Said: ', response);
    };

    getToken();
  }, [getIdTokenClaims, setToken]);

  const [formData, setFormData] = useState({
    race:"",
    classType: "",
    alignment: "",
    gender: '',
  });

 
  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(false);




   const randomizeField = (field) => {
    const randomValues = {
       race: [
      'Human', 'Elf', 'Dwarf', 'Orc', 'Goblin', 'Troll', 'Halfling',
      'Gnome', 'Undead', 'Minotaur', 'Centaur', 'Fairy', 'Merfolk', 'Dragonkin'
    ],
       classType: [
      'Warrior', 'Mage', 'Rogue', 'Priest', 'Druid', 'Warlock', 'Paladin',
      'Hunter', 'Monk', 'Bard', 'Necromancer', 'Summoner', 'Alchemist', 'Sorcerer'
    ],
      gender: ['Male', 'Female', 'Non-binary', 'Other'],
      alignment: [
      'Brave', 'Wise', 'Mysterious', 'Charming', 'Resourceful', 'Honorable',
      'Loyal', 'Adventurous', 'Stoic', 'Eloquent', 'Fearless', 'Empathic', 'Cunning', 'Resilient'
    ]
    };
     
    setFormData({
      ...formData,
      [field]: randomValues[field][Math.floor(Math.random() * randomValues[field].length)],

    });

  };

  const generateStory = async () => {
    setIsLoading(true);
  
    try {
      const prompt = `Generate a concise unique backstory for ${formData.charName}, a ${formData.gender} ${formData.race} ${formData.classType} character with a ${formData.personality} alignment in a fantasy setting in a unique place. Limit the length to around 200 words.`;
      const response = await axios.post(OPENAI_API_ENDPOINT, {
        model: OPENAI_MODEL,
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
        max_tokens: 500,
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
  
      let generatedStory = response.data.choices[0].message.content;
      setGeneratedStory(generatedStory);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async () => {
    setIsLoadingImg(true);
  
    try {
      const response = await axios.post(
        OPENAI_IMAGE_API_ENDPOINT,
        {
          model: 'image-alpha-001', 
          prompt: `Create a high-quality portrait of a ${formData.gender} ${formData.race} ${formData.classType} character with a ${formData.personality} alignment in a realistic fantasy setting. Please provide an image with a high resolution`,
          n: 1,
          size: '256x256',
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const generatedImageUrl = response.data.data[0].url;
      setGeneratedImage(generatedImageUrl); 
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoadingImg(false);
    }
  };
  

  
  const randomizeAll = () => {
    const randomValues = {
      race: [
        'Human', 'Elf', 'Dwarf', 'Orc', 'Goblin', 'Troll', 'Halfling',
        'Gnome', 'Undead', 'Minotaur', 'Centaur', 'Fairy', 'Merfolk', 'Dragonkin'
      ],
      classType: [
        'Warrior', 'Mage', 'Rogue', 'Priest', 'Druid', 'Warlock', 'Paladin',
        'Hunter', 'Monk', 'Bard', 'Necromancer', 'Summoner', 'Alchemist', 'Sorcerer'
      ],
      gender: ['Male', 'Female', 'Non-binary', 'Other'],
      alignment: [
        'Brave', 'Wise', 'Mysterious', 'Charming', 'Resourceful', 'Honorable',
        'Loyal', 'Adventurous', 'Stoic', 'Eloquent', 'Fearless', 'Empathic', 'Cunning', 'Resilient'
      ]
    };

    setFormData({
      race: randomValues.race[Math.floor(Math.random() * randomValues.race.length)],
      classType: randomValues.classType[Math.floor(Math.random() * randomValues.classType.length)],
      gender: randomValues.gender[Math.floor(Math.random() * randomValues.gender.length)],
      alignment: randomValues.alignment[Math.floor(Math.random() * randomValues.alignment.length)],
    });
  };


  

const handleCreateButtonClick = async () => {
    if (!user) {
      console.error('User not logged in');
      return;
    }

    try {
      const token = await getAccessTokenSilently();
   

   
    // Collect the data from the state variables
   const characterData = {
      userEmail: user.email,  // This should now work since we check if user is defined
      charName: formData.charName, 
      race: formData.race, 
      classType: formData.classType, 
      alignment: formData.alignment, 
      gender: formData.gender, 
      imageURL: generatedImage, 
      backstory: generatedStory,
        };   console.log('Data to be sent:', characterData);

    const response = await axios.post(`${SERVER_URL}/character`, characterData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    // Log the data to be sent (add this line to debug the data)
    console.log('Data to be sent:', characterData);
    // Send the data to the server using a POST request

    // Handle the response from the server (you might want to display a success message or handle errors)
    if (response.status === 201) {
      alert('Character created successfully');
      // ... (other success handling code)
    } else {
      alert('Failed to create character');
      // ... (other error handling code)
    }
  } catch (error) {
    console.error('Error creating character:', error);
    // ... (other error handling code)
  }
};

return (
  <div>
    <Header />
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
        <div className="form-group">
          <label>Character Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.charName}
            onChange={(e) => setFormData({ ...formData, charName: e.target.value })}
          />
        </div>
        {Object.keys(formData)
          .filter((field) => field !== 'charName')
          .map((field, index) => (
            <div className="form-group" key={index}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={() => randomizeField(field)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
</svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div>
          <button style={{marginTop: '20px'}}className="btn btn-secondary ml-2" type="button" onClick={randomizeAll}>
            Randomize All{' '}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
</svg>
          </button>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <div
    style={{
      width: '256px',
      height: '256px',
      border: '1px solid #6B4226',
      background: '#FEF3E2',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {generatedImage && (
      <img
        src={generatedImage}
        alt="Generated Character"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          border: '1px solid #6B4226',
          margin: 'auto', // Center both horizontally and vertically
          display: 'block', // Remove any inline whitespace
        }}
      />
    )}
  </div>
  <button style={{ marginTop: '20px',  background: '#6B4226', 
    color: '#FEF3E2', borderColor: '#6B4226' }} className="btn btn-primary btn-block" onClick={generateImage} disabled={isLoadingImg}>
    {isLoadingImg ? 'Generating Image...' : 'Generate Image'}
  </button>
</div>

    </div>
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
      <div style={{ flex: 1 }}>
        <textarea className="form-control" rows="4" placeholder="Your story here..." value={generatedStory}></textarea>
        <button style={{ background: '#6B4226', 
    color: '#FEF3E2', borderColor: '#6B4226'}}onClick={generateStory} disabled={isLoading} className="btn btn-primary btn-block mt-2">
          {isLoading ? 'Generating...' : 'Generate Story'}
        </button>
      </div>
    </div>
    {user ? (
      <button style={{background: '#DB850D',  fontFamily: 'Fantasy, cursive',borderColor:'#DB850D' }}onClick={handleCreateButtonClick} className="btn btn-primary btn-block mt-3">
        Save Character
      </button>
    ) : (
      <button className="btn btn-secondary btn-block mt-3" disabled>
        Please login before you can save
      </button>
    )}
  </div>
);
}

export default withAuth0(CreateNew);