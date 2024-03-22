import React, { useState } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio('./sounds/background.mp3');

  const togglePlayback = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={togglePlayback}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  );
};

export default MusicPlayer; 