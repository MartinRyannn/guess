import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import GameCard from './extras/GameCard';
import GameOver from './extras/GameOver';

function Game({ level, level_id }) {
  const { images, cardAmount } = level;
  const [backgroundColor, setBackgroundColor] = useState('#0F0F0F');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [points, setPoints] = useState(0);
  const [tries, setTries] = useState(0);
  const [showingHint, setShowingHint] = useState(false);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(level.time);
  const [credits, setCredits] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [matchedSets, setMatchedSets] = useState(new Set());
  const [completionTime, setCompletionTime] = useState('00:00');
  const [startTime, setStartTime] = useState(Date.now());
  const [gameTimer, setGameTimer] = useState(null);
  const [gridClassName, setGridClassName] = useState('');
  const [creditsUpdated, setCreditsUpdated] = useState(false);

  useEffect(() => {
    const allCards = generateCards(cardAmount, images);
    const shuffledCards = shuffle(allCards);
    setCards(shuffledCards);
    setGridClassName(`grid-${cardAmount}`);

    startTimer();

    return () => clearInterval(gameTimer);
  }, [level, images]);

  

  useEffect(() => {
    if (matchedSets.size === cardAmount / 3) {
      setGameOver(true);
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      setCompletionTime(formatTime(elapsedTime / 1000));
      clearInterval(gameTimer);
      // handleGameEnd(); // Removed from here
    }
  }, [matchedSets, cardAmount, startTime]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const changeBackgroundColor = () => {
    const darkColors = ['#1a1a1a', '#262626', '#333333', '#404040', '#4d4d4d', '#595959', '#666666', '#737373', '#808080', '#8c8c8c', '#4A285B', '#8A2BE2', '#800080', '#4B0082', '#483D8B', '#00008B', '#0000CD', '#0000FF', '#4169E1', '#4682B4', '#00BFFF', '#1E90FF', '#87CEEB', '#87CEFA', '#00CED1', '#20B2AA', '#008B8B', '#008080', '#00FA9A',  '#FFDAB9', '#F5DEB3'];
    const randomColor = darkColors[Math.floor(Math.random() * darkColors.length)];
    setBackgroundColor(randomColor);
  };
  

  const startTimer = () => {
    clearInterval(gameTimer);

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 0) {
          clearInterval(timer);
          setGameOver(true);
          setCompletionTime(formatTime(level.time));
          handleGameEnd();
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    setGameTimer(timer);
  };

  const generateCards = (cardAmount, images) => {
    const numbers = Array.from({ length: cardAmount / 3 }, (_, index) =>
      String.fromCharCode(65 + index)
    );
    const allCards = [];

    for (let i = 0; i < cardAmount / numbers.length; i++) {
      numbers.forEach(number => {
        allCards.push({
          id: allCards.length,
          number: number,
          flipped: false,
          image: images[Math.floor(Math.random() * images.length)],
        });
      });
    }

    return allCards;
  };

  const shuffle = array => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleGameEnd = () => {
    if (!gameOver) {
      const currentPoints = points;
      const endTime = Date.now();
      const elapsedTimeInSeconds = (endTime - startTime) / 1000;
  
      // Award 5 credits if the level is passed
      if (currentPoints > 700) {
        setCredits(prevCredits => prevCredits + 5);
        const updatedWins = localStorage.getItem('wins')
          ? parseInt(localStorage.getItem('wins')) + 1
          : 1;
        localStorage.setItem('wins', updatedWins);
      }
  
      if (
        localStorage.getItem('userId') &&
        level_id &&
        typeof currentPoints === 'number' &&
        typeof (level.time - timeLeft) === 'number'
      ) {
        const gameData = {
          player_id: localStorage.getItem('userId'),
          level_id: level_id,
          score: currentPoints,
          time: level.time - timeLeft,
          credits: credits,
          date_played: new Date().toISOString(),
        };
  
        console.log('Game data to send:', gameData);
  
        fetch('http://localhost/backend/save_game.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gameData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to save game data.');
            }
            console.log('Game data saved successfully.');
          })
          .catch((error) => {
            console.error('Error saving game data:', error);
          });
      } else {
        console.error('Error: Invalid game data');
      }
    }
  };
  
  
  useEffect(() => {
    if (matchedSets.size === cardAmount / 3 || timeLeft === 0) {
      setGameOver(true);
      handleGameEnd();
    }
  }, [matchedSets, cardAmount, timeLeft]);

  const fetchUserInfo = () => {
    console.log("Fetching user info...");
    fetch('http://localhost/backend/get_credits.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: localStorage.getItem('username') }),
    })
      .then(response => {
        console.log("Received response from server:", response);
        if (!response.ok) {
          throw new Error('Failed to fetch user information.');
        }
        return response.json();
      })
      .then(data => {
        console.log("Received data:", data);
        const userCredits = data.credits !== undefined ? data.credits : 0;
        console.log("Updating credits:", userCredits);
        setCredits(userCredits);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
      });
  };

  const handleMatch = () => {
    if (!creditsUpdated) {
      // Fetch user info to get current credits
      fetchUserInfo();
      setCreditsUpdated(true);
    }
    
    // Update points and matched sets
    setPoints(points + 150);
    setMatchedSets(new Set([...matchedSets, flippedCards[0].number]));
    setFlippedCards([]);
    
    // Increment credits by 1
    setCredits(prevCredits => prevCredits + 1);
  };
  
  

  const handleMismatch = () => {
    setTimeout(() => {
      const updatedCards = cards.map(card => {
        if (flippedCards.some(flippedCard => flippedCard.id === card.id)) {
          return { ...card, flipped: false };
        }
        return card;
      });
      setCards(updatedCards);
      setFlippedCards([]);
    }, 1000);
  };

  const handleCardClick = clickedCard => {
    if (
      !clickDisabled &&
      !showingHint &&
      flippedCards.length < 3 &&
      !clickedCard.flipped
    ) {
      const updatedCards = cards.map(card =>
        card.id === clickedCard.id ? { ...card, flipped: true } : card
      );
      setCards(updatedCards);
      setFlippedCards([...flippedCards, clickedCard]);

      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const card3 = clickedCard;

        if (card1.number === card2.number && card2.number === card3.number) {
          handleMatch();
        } else {
          handleMismatch();
        }

        setTries(tries + 1);
      }
    }
  };

  const handleHint = () => {
    if (!clickDisabled && !showingHint && credits >= 5) {
      const unflippedCards = cards.filter(card => !card.flipped);
      const uniqueNumbers = [...new Set(unflippedCards.map(card => card.number))];
  
      if (uniqueNumbers.length > 0) {
        const randomNumberIndex = Math.floor(Math.random() * uniqueNumbers.length);
        const randomNumber = uniqueNumbers[randomNumberIndex];
        const matchingCards = unflippedCards.filter(
          card => card.number === randomNumber
        );
  
        if (matchingCards.length >= 3) {
          const hintCards = matchingCards.slice(0, 3);
  
          const updatedCards = cards.map(card =>
            hintCards.some(hintCard => hintCard.id === card.id)
              ? { ...card, flipped: true }
              : card
          );
  
          setCards(updatedCards);
          setShowingHint(true);
          setClickDisabled(true);
          // Deduct 5 credits for using the hint
          setCredits(prevCredits => prevCredits - 5); // Update credits here
  
          setTimeout(() => {
            const resetCards = updatedCards.map(card =>
              hintCards.some(hintCard => hintCard.id === card.id)
                ? { ...card, flipped: false }
                : card
            );
            setCards(resetCards);
            setShowingHint(false);
            setClickDisabled(false);
          }, 1000);
        }
      }
    }
  };
  

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleGiveUp = () => {
    setGameOver(true);
    setCompletionTime(formatTime(level.time - timeLeft));
  };

  const restartGame = () => {
    clearInterval(gameTimer);

    const allCards = generateCards(cardAmount, images);
    const shuffledCards = shuffle(allCards);
    setCards(shuffledCards);
    setFlippedCards([]);
    setPoints(0);
    setTries(0);
    setShowingHint(false);
    setClickDisabled(false);
    setTimeLeft(level.time);
    setGameOver(false);
    setMatchedSets(new Set());
    setCompletionTime('00:00');

    startTimer();
  };

  return (
    <div className="mainContainer-game" style={{ backgroundColor: backgroundColor }}>
      {!gameOver && (
        <div>
          <div className="gameTopBar">
            <div className="barLeft">
              <button
                className="hintButton"
                onClick={handleHint}
                disabled={clickDisabled || credits < 5}
              >
                HINT
              </button>
              <button className="giveUpButton" onClick={handleGiveUp}>
                GIVE UP
              </button>
              <button className="giveUpButton2" onClick={changeBackgroundColor}>
                CHANGE BG
              </button>
            </div>
            <div className="barMid">
              <div className="midHeading">MEMORY GAME</div>
              <div className={`timer ${timeLeft < 30 ? 'red' : ''}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
            <div className="barRight">
              <div className="points">POINTS: {points}</div>
              <div className="credits">TRIES: {tries}</div>
              <div className="credits">CREDITS: {credits !== null ? (credits !== 0 ? credits : 0) : 'Loading...'}</div>
            </div>
          </div>
          <div className={`playingArea ${gridClassName}`}>
            {cards.map(card => (
              <GameCard
                key={card.id}
                card={card}
                handleCardClick={handleCardClick}
                images={images}
              />
            ))}
          </div>
        </div>
      )}
      {gameOver && (
        <GameOver
          restartGame={restartGame}
          points={points}
          completionTime={completionTime}
        />
      )}
    </div>
  );
}

export default Game;
