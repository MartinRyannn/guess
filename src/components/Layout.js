// Layout.js
import React from 'react';
import MusicPlayer from './MusicPlayer';

const Layout = ({ children }) => {
  return (
    <div>
      <MusicPlayer />
      {children}
    </div>
  );
};

export default Layout;
