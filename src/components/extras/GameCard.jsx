// GameCard.jsx
import React from 'react';
import '../../styles/styles.css';

function GameCard({ card, handleCardClick, images }) {
  const { id, number, flipped, matched } = card;


  const handleClick = () => {
    handleCardClick(card);
  };

  const imageIndex = number.charCodeAt(0) - 'A'.charCodeAt(0); // Convert letter to numeric index
  const imageSrc = images[imageIndex];

  return (
    <div
      className={`gameCard ${flipped ? 'flipped' : ''} ${matched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="cardContent">
        {flipped ? (
          <img src={imageSrc} alt={number} className="cardImage" /> // Use the numeric index to access the image
        ) : (
          <div className="cardText">?</div>
        )}
      </div>
    </div>
  );
}

export default GameCard;
