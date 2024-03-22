import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Menu from "../components/extras/Menu"

function LevelStart() {
  const params = useParams();
  const levelNumber = params.levelNumber;
  const [levelData, setLevelData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching level data for levelNumber:', levelNumber);
    // Fetch level data based on level number
    fetch(`http://localhost/backend/fetch_levels.php?levelNumber=${levelNumber}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched level data:', data);
        const level = data.levels.find(level => level.levelNR === levelNumber);
        setLevelData(level);
      })
      .catch(error => console.error('Error fetching level data:', error));
  }, [levelNumber]);

  const handleStartGame = () => {
    // Redirect to the Game component with the selected levelID
    console.log('Starting game with levelData:', levelData);
    if (levelData && levelData.id) {
      console.log('Navigating to Game with levelID:', levelData.id);
      navigate(`/Game/${levelData.id}`, { level_id: levelData.id }); // Pass level_id as a prop
    }
  };

  return (
    
    <div className="mainContainer-sta">
      <Menu />
      <div className="mainHeading-sta">LEVEL {levelNumber}</div>
      {levelData && (
        <div className="Box-sta">
          <div className="boxHeading-sta">{levelData.name}</div>
          <div className="boxBar-sta">
            <div className="boxBarHeading">DIFFICULTY</div>
            <div className="boxBarText">{levelData.difficulty}</div>
          </div>
          <div className="boxBar-sta">
            <div className="boxBarHeading">CARDS</div>
            <div className="boxBarText">{levelData.cards}</div>
          </div>
          <div className="boxBar-sta">
            <div className="boxBarHeading">TIME</div>
            <div className="boxBarText">{levelData.time}</div>
          </div>
          <button className="startButton" onClick={handleStartGame}>START</button>
        </div>
      )}
    </div>
  );
}

export default LevelStart;
