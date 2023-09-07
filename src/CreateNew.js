import Header from './Header';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-3.5-turbo-0613';

function CreateNew() {

  const [formData, setFormData] = useState({
    race: '',
    class: '',
    gender: '',
    personality: '',
  });

  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const randomizeField = (field) => {
    const randomValues = {
       race: [
      'Human', 'Elf', 'Dwarf', 'Orc', 'Goblin', 'Troll', 'Halfling',
      'Gnome', 'Undead', 'Minotaur', 'Centaur', 'Fairy', 'Merfolk', 'Dragonkin'
    ],
       class: [
      'Warrior', 'Mage', 'Rogue', 'Priest', 'Druid', 'Warlock', 'Paladin',
      'Hunter', 'Monk', 'Bard', 'Necromancer', 'Summoner', 'Alchemist', 'Sorcerer'
    ],
      gender: ['Male', 'Female', 'Non-binary', 'Other'],
        personality: [
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
      // const maxTokens = 300; 
      const prompt = `Generate a concise unique backstory for ${formData.name}, a ${formData.gender} ${formData.race} ${formData.class} character with a ${formData.personality} alignment in a fantasy setting in a unique place. Limit the length to around 200 words.`;
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
      console.log('API Response:', response); // Logs the API response for debugging
  
      let generatedStory = response.data.choices[0].message.content;
      setGeneratedStory(generatedStory);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateStory = () => {
    generateStory();
  };

  const randomizeAll = () => {
    const randomValues = {
      race: [
        'Human', 'Elf', 'Dwarf', 'Orc', 'Goblin', 'Troll', 'Halfling',
        'Gnome', 'Undead', 'Minotaur', 'Centaur', 'Fairy', 'Merfolk', 'Dragonkin'
      ],
      class: [
        'Warrior', 'Mage', 'Rogue', 'Priest', 'Druid', 'Warlock', 'Paladin',
        'Hunter', 'Monk', 'Bard', 'Necromancer', 'Summoner', 'Alchemist', 'Sorcerer'
      ],
      gender: ['Male', 'Female', 'Non-binary', 'Other'],
      personality: [
        'Brave', 'Wise', 'Mysterious', 'Charming', 'Resourceful', 'Honorable',
        'Loyal', 'Adventurous', 'Stoic', 'Eloquent', 'Fearless', 'Empathic', 'Cunning', 'Resilient'
      ]
    };

    setFormData({
      race: randomValues.race[Math.floor(Math.random() * randomValues.race.length)],
      class: randomValues.class[Math.floor(Math.random() * randomValues.class.length)],
      gender: randomValues.gender[Math.floor(Math.random() * randomValues.gender.length)],
      personality: randomValues.personality[Math.floor(Math.random() * randomValues.personality.length)],
    });
  };

  const handleSubmit = () => {
    console.log('Form Submitted', formData);
  };

  const handleCreateButtonClick = async () => {
    try {
      const imageElement = document.querySelector('img[alt="Placeholder"]');
      const storyElement = document.querySelector('textarea[placeholder="Your story here..."]');
      const characterData = {
        ...formData,
        generatedStory: generatedStory, // or directly from storyElement.value if necessary
        imageUrl: imageElement ? imageElement.src : ''
      };
      const response = await axios.post('YOUR_SERVER_URL/character', characterData);
      console.log('Character created:', response.data);
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  return (
<div><Header />
   <div className="container">
         <div className="row">
      <div className="col-md-6">
      <div style={{ border: '1px solid #000',background:'#fff',  padding: '10px', boxShadow: '0px 0px 10px #000', maxWidth: '400px', margin: '0 auto' }}>
       <div className="form-group">
          <label>Enter Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        {Object.keys(formData).map((field, index) => (
          <div className="form-group" key={index}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                value={formData[field]} 
                onChange={(e) => setFormData({...formData, [field]: e.target.value})}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={() => randomizeField(field)}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
</svg>
</button>
              </div>
            </div>
          </div>
        ))}
        <div>
          <button className="btn btn-secondary ml-2" type="button" onClick={randomizeAll}>Randomize All <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
</svg></button>
        </div>
      </div>
    </div>

      <div className="col-md-5">
       <div style={{ background:'#fff', border: '1px solid #000', padding: '10px', boxShadow: '0px 0px 10px #000', marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', border: '1px solid #ccc' }}>
            <img src="" alt="Placeholder" style={{ width: '250px', height: '250px' }} />
          </div>
          <button className="btn btn-primary btn-block">Create Image</button>
        </div>
        <div style={{background:'#fff',  border: '1px solid #000', padding: '10px', boxShadow: '0px 0px 10px #000' }}>
          
         <textarea className="form-control" rows="4" placeholder="Your story here..." value={generatedStory} ></textarea>
          <button onClick={generateStory} disabled={isLoading} className="btn btn-primary btn-block mt-2" > {isLoading ? 'Generating...' : 'Generate Story'} </button>
         </div>
      </div>
      <button onClick={handleCreateButtonClick} className="btn btn-primary btn-block mt-3">Save Character</button>
    </div>
  </div>
    </div>
  );
}

export default withAuth0(CreateNew);