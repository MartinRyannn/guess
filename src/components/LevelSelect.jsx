import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Background1 from '../images/background1.png'; // Define Background1
import Background2 from '../images/background2.jpg'; // Define Background2
import Menu from './extras/Menu'; // Fix import path

function LevelSelect() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [levels, setLevels] = useState([]);
  const [completionStatus, setCompletionStatus] = useState({});

  useEffect(() => {
    fetchBackgroundImage();
    fetchLevels();
    fetchCompletionStatus();
  }, []);

  const fetchBackgroundImage = () => {
    // Retrieve the username from local storage
    const storedUsername = localStorage.getItem('username');
  
    // Fetch user's information from the database
    fetch(`http://localhost/backend/get_user_info.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: storedUsername }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user information.');
        }
        return response.json();
      })
      .then(data => {
        // Log the retrieved background image number
        console.log('Background image number:', data.background_image);
  
        // Parse the background_image value to an integer
        const backgroundImageNumber = parseInt(data.background_image);
  
        // Set the background image based on the retrieved image number
        if (backgroundImageNumber === 1) {
          setBackgroundImage(Background1);
        } else if (backgroundImageNumber === 2) {
          setBackgroundImage(Background2);
        } else {
          // Set a default background image if the value is not recognized
          setBackgroundImage(Background1); // Or set any default background image
        }
        // Log the set background image
        console.log('Background image:', backgroundImage);
      })
      .catch(error => {
        console.error('Error fetching background image:', error);
      });
  };
  

  const fetchLevels = () => {
    fetch(`http://localhost/backend/fetch_levels.php?userId=${localStorage.getItem('userId')}&sort=difficulty`)
      .then(response => response.json())
      .then(data => {
        setLevels(data.levels);
      })
      .catch(error => console.error('Error fetching levels:', error));
  };

  const fetchCompletionStatus = () => {
    fetch(`http://localhost/backend/fetch_level_completion.php?userId=${localStorage.getItem('userId')}`)
      .then(response => response.json())
      .then(data => {
        setCompletionStatus(data);
      })
      .catch(error => console.error('Error fetching level completion status:', error));
  };

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toUpperCase()) {
      case 'EASY':
        return 'difficultyHeading-easy';
      case 'MEDIUM':
        return 'difficultyHeading-medium';
      case 'HARD':
        return 'difficultyHeading-hard';
      default:
        return 'difficultyHeading';
    }
  };

  return (
    <div>
      <Menu /> {/* Add the Menu component */}
      <div className="mainContainer-lev" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="mainHeading-lev">LEVEL SELECT</div>
        <div className="levelSelectCont">
          {levels.map(level => (
            <Link key={level.id} to={`/LevelStart/${level.id}`} className="levelBox" style={{ backgroundImage: `url(${level.background_image})` }}>
              <div className="levelHeading">LEVEL {level.levelNR}</div>
              <div className={getDifficultyClass(level.difficulty)}>{level.difficulty}</div>
              <div className='comp'>{completionStatus[level.id] ? 'COMPLETED' : 'NOT COMPLETED'}</div>
              {completionStatus[level.id] && <div className='score'>{completionStatus[level.id]}</div>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LevelSelect;
