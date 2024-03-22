import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import Menu from './extras/Menu';
import Background1 from '../images/background1.png'; // Define Background1
import Background2 from '../images/background2.jpg'; // Define Background2

function History() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [gameHistory, setGameHistory] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('recent'); // Default sorting criteria
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 20;

  useEffect(() => {
    fetchBackgroundImage();
    fetchGameHistory();
  }, [sortCriteria, currentPage]); // Refetch game history when sorting criteria or page changes

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;
    setCurrentPage(page);
  }, []); // Set current page from URL parameter on initial load

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

  const fetchGameHistory = () => {
    // Retrieve the player ID from local storage or session
    const playerId = localStorage.getItem('userId'); // Adjust this according to how you store player ID

    // Calculate the starting index of games for the current page
    const startIndex = (currentPage - 1) * gamesPerPage;

    // Make an HTTP request to fetch game history data with sorting criteria and pagination
    fetch(`http://localhost/backend/get_game_history.php?playerId=${playerId}&sort=${sortCriteria}&limit=${gamesPerPage}&offset=${startIndex}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch game history.');
        }
        return response.json();
      })
      .then(data => {
        setGameHistory(data.gameHistory);
      })
      .catch(error => {
        console.error('Error fetching game history:', error);
      });
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', page);
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
  };

  return (
    <>
      <Menu />
      <div className="mainContainer-lead" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="leaderboardHeading">GAME HISTORY</div>
        <div className="sortBox">
          <select className="select2" onChange={handleSortChange} value={sortCriteria}>
            <option value="recent">RECENT</option>
            <option value="oldest">OLDEST</option>
            <option value="score">SCORE</option>
          </select>
        </div>
        <div className="TableBox">
          <table className="leaderboardTable">
            <thead>
              <tr>
                <th>NR</th>
                <th>LEVEL</th>
                <th>SCORE</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory.map((game, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>LEVEL {game.level_id}</td>
                  <td>{game.score}</td>
                  <td>{game.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button className='pageButton' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span className='pageSpan'>Page {currentPage}</span>
          <button className='pageButton' onClick={() => handlePageChange(currentPage + 1)} disabled={gameHistory.length < gamesPerPage}>Next</button>
        </div>
      </div>
    </>
  );
}

export default History;
