import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { updateAssets } from './features/crypto/cryptoSlice';
import CryptoTable from './components/CryptoTable';
import { useTheme } from './context/ThemeContext';

// Theme Icons
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1em" height="1em">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12H.75m.386-6.364l1.591 1.591M12 12a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1em" height="1em">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75 2.571 0 4.962-.994 6.75-2.668a9.753 9.753 0 012.252-3.33z" />
  </svg>
);

// Social Icons
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="1em" height="1em">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const UPDATE_INTERVAL = 1500;

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Remove previous theme class before adding the new one
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    return () => {
      // Clean up just in case
      document.body.classList.remove('light', 'dark');
    };
  }, [theme]); // Only run when theme changes

  useEffect(() => {
    // Interval for updating assets (independent of theme)
    const intervalId = setInterval(() => {
      dispatch(updateAssets());
    }, UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [dispatch]); // Only runs once on mount

  return (
    <div className="App">
      <div className="app-header">
        <h1>Real-Time Cryptocurrency Prices</h1>
      </div>

      <CryptoTable />

      <div className="top-right-controls">
        <button onClick={toggleTheme} className="theme-toggle-button icon-button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <div className="social-links">
          <a href="https://github.com/Vansh0204" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="icon-button social-icon">
            <GitHubIcon />
          </a>
          <a href="www.linkedin.com/in/vansh-agarwal-0413j" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="icon-button social-icon">
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default App; 