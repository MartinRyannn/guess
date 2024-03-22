import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import Menu from './extras/Menu'; // Import Menu component
import Background1 from '../images/background1.png'; // Define Background1
import Background2 from '../images/background2.jpg'; // Define Background2

function Leaderboards() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortBy, setSortBy] = useState('score'); // Default sorting criteria

  useEffect(() => {
    fetchBackgroundImage();
    fetchLeaderboardData();
  }, [sortBy]); // Fetch data when sortBy state changes

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
      })
      .catch(error => {
        console.error('Error fetching background image:', error);
      });
  };

  const fetchLeaderboardData = () => {
    // Fetch top players data from the backend based on the selected sorting criteria
    fetch(`http://localhost/backend/get_leaderboard.php?sort=${sortBy}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data.');
        }
        return response.json();
      })
      .then(data => {
        setLeaderboardData(data);
      })
      .catch(error => {
        console.error('Error fetching leaderboard data:', error);
      });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value); // Update sortBy state based on user's selection
  };

  return (
    <>
      <Menu /> {/* Add the Menu component */}
      <div className="mainContainer-lead" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="leaderboardHeading">LEADERBOARDS</div>
        <div className="sortBox">
          <select className="selectBox" onChange={handleSortChange} value={sortBy}>
            <option value="score">Score</option>
            <option value="wins">Wins</option>
          </select>
        </div>
        <div className="TableBox">
          <table className="leaderboardTable">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Total Score</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.username}</td>
                  <td>{player.score}</td>
                  <td>{player.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Leaderboards;
