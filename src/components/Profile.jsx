import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import { Link } from 'react-router-dom';
import Background1 from '../images/background1.png';
import Background2 from '../images/background2.jpg';
import Menu from "./extras/Menu";
import ChangeProfile from "../components/extras/ChangeProfile";
import Profile1 from "../images/profile1.jpg";
import Profile2 from "../images/profile2.jpg"; // New profile image
import Profile3 from "../images/profile3.jpg";

function Profile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wins, setWins] = useState('');
  const [credits, setCredits] = useState('');
  const [score, setScore] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [profileImage, setProfileImage] = useState(Profile3); // Default profile image
  const [isChangeProfileOpen, setIsChangeProfileOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
    fetchUserInfo(storedUsername);
  }, []);

  const fetchUserInfo = (username) => {
    console.log('Fetching user info for username:', username);
    fetch(`http://localhost/backend/get_user_info.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user information.');
        }
        return response.json();
      })
      .then(data => {
        console.log('User info fetched successfully:', data);
        setUsername(data.username);
        setPassword(data.password);
        setCredits(data.credits);
        setScore(data.score);
        setBackgroundImage(data.background_image);
        setProfileImage(data.wins >= 50 ? Profile2 : Profile3); // Set profile image based on wins
        // Fetch wins for the user
        fetchWins(data.username);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  };
  
  const fetchWins = (username) => {
    fetch(`http://localhost/backend/get_wins.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch wins.');
        }
        return response.json();
      })
      .then(data => {
        setWins(data.wins);
      })
      .catch(error => {
        console.error('Error fetching wins:', error);
      });
  };

  const handleBackgroundChange = (backgroundId) => {
    fetch('http://localhost/backend/update_background.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, backgroundImage: parseInt(backgroundId) }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update background image.');
        }
        setBackgroundImage(backgroundId);
      })
      .catch(error => {
        console.error('Error updating background image:', error);
      });
  };

  const handleEditProfile = (newUsername, newPassword) => {
    // Log the newUsername, newPassword, and userId
    const userId = localStorage.getItem('userId');
    console.log('userId:', userId);
    console.log('newUsername:', newUsername);
    console.log('newPassword:', newPassword);

    fetch('http://localhost/backend/update_user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newUsername, newPassword, userId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update username and password.');
        }
        // Handle success
        console.log('Username and password updated successfully.');
      })
      .catch(error => {
        console.error('Error updating username and password:', error);
      });
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsChangeProfileOpen(true);
  };

  return (
    <>
      <Menu />
      {isChangeProfileOpen && <ChangeProfile handleEditProfile={handleEditProfile} handleClose={() => setIsChangeProfileOpen(false)} currentUsername={username} currentPassword={password} />}
      <div className="mainContainer-log" style={{ backgroundImage: `url(${backgroundImage === 1 ? Background1 : Background2})` }}>
        <div className="profileHeading">PROFILE</div>
        <div className="profileContainer">
          <div className="profileLeft">
            <div className="profileImage">
              <img src={profileImage} alt="Profile" />
            </div>
            <div className="profileStatBox">
              <div className="statBox">
                <div className="statHeading">WINS</div>
                <div className="statData">{wins}</div>
              </div>
              <div className="statBox">
                <div className="statHeading">CREDITS</div>
                <div className="statData">{credits}</div>
              </div>
              <div className="statBox">
                <div className="statHeading">TOTAL SCORE</div>
                <div className="statData">{score}</div>
              </div>
            </div>
          </div>
          <div className="profileRight">
            <div className="rightHeading">DETAILS</div>
            <div className="detailsBox">
              <div className="detailsHeading">USERNAME</div>
              <input type="text" className="detailsInput" value={username} readOnly />
              <button className="editButton" onClick={handleClick}>CHANGE</button>
            </div>
            <div className="detailsBox">
              <div className="detailsHeading">PASSWORD</div>
              <input type="text" className="detailsInput" value={password} readOnly />
              <button className="editButton" onClick={handleClick}>CHANGE</button>
            </div>
            <div className="backgroundHeading">CHANGE BACKGROUND</div>
            <div className="backgroundBox" onClick={() => handleBackgroundChange(1)}><img className='backgroundIMG' src={Background1} alt="" /></div>
            <div className="backgroundBox" onClick={() => handleBackgroundChange(2)}><img className='backgroundIMG' src={Background2} alt="" /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
