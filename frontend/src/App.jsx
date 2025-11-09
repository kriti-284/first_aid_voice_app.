import React, { useState } from 'react';
import Home from './Home';
import CallingOverlay from './CallingOverlay';

const App = () => {
  // State to control the visibility of the emergency call overlay
  const [isCalling, setIsCalling] = useState(false);
  // New state for theme, default to 'dark'
  const [theme, setTheme] = useState('dark');

  // Define colors based on theme
  const colors = {
    dark: {
      appBg: '#1f2937',
    },
    light: {
      appBg: '#f3f4f6',
    }
  };

  const toggleTheme = () => {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        // Apply dynamic background color
        backgroundColor: colors[theme].appBg,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Set text color for the whole app
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
        transition: 'background-color 0.5s',
      }}
    >
      {/* Conditionally render the CallingOverlay */}
      {isCalling && <CallingOverlay onCancel={() => setIsCalling(false)} />}

      {/* Pass theme state, toggle function, and call trigger to Home */}
      <Home
        onStartCall={() => setIsCalling(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
};

export default App;
