import React, { useState } from 'react';
import '../../styles/styles.css';
import level1 from '../../images/level1.png'

function LevelBox({levelNR, difficulty, backgroundImage}) {
  return (

    <div className="levelBox" alt="Level 1" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="levelHeading">LEVEL {levelNR}</div>
      <div className="difficultyHeading">{difficulty}</div>
    </div>

  );
}

export default LevelBox;
