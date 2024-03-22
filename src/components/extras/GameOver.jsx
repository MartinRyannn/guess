import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/styles.css';
import { Link } from "react-router-dom";

function GameOver({ restartGame, points, completionTime }) {
  return (
    <div className="transparentBack">
      <div className="gameOverBox">
        <div className="gameOverHeading">GAME OVER</div>
        <div className="gameOverBar">
          <div className="barHeading">SCORE</div>
          <div className="barData"><span className='barSpan'>{points}</span></div>
        </div>
        <div className="gameOverBar2">
          <div className="barHeading">TIME</div>
          <div className="barData2">{completionTime}</div>
        </div>
        <div className="gameOverButton" onClick={restartGame}>TRY AGAIN</div>
        <Link to="/LevelSelect" className="gameOverButton2">EXIT</Link>
      </div>
    </div>
  );
}

GameOver.propTypes = {
  restartGame: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
  completionTime: PropTypes.string.isRequired,
};

export default GameOver;
