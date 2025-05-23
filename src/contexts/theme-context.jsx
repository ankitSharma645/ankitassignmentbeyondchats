import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '../lib/themes';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [colorTheme, setColorTheme] = useState('');

  useEffect(() => {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColorTheme = localStorage.getItem('colorTheme') || '';
    setTheme(savedTheme);
    setColorTheme(savedColorTheme);
    
    // Apply theme to document
    document.documentElement.classList.remove('dark', 'theme-blue', 'theme-purple', 'theme-green', 'theme-neon', 'theme-sunset', 'theme-ocean');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    if (savedColorTheme) {
      document.documentElement.classList.add(savedColorTheme);
    }
  }, []);

  const changeTheme = (newTheme) => {
    const selectedTheme = themes.find(t => t.id === newTheme);
    if (!selectedTheme) return;

    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'theme-blue', 'theme-purple', 'theme-green', 'theme-neon', 'theme-sunset', 'theme-ocean');
    
    // Add the new theme class
    if (selectedTheme.className) {
      document.documentElement.classList.add(selectedTheme.className);
    }
    
    // Update state and localStorage
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Handle color themes
    if (newTheme !== 'light' && newTheme !== 'dark') {
      setColorTheme(selectedTheme.className);
      localStorage.setItem('colorTheme', selectedTheme.className);
    } else {
      setColorTheme('');
      localStorage.setItem('colorTheme', '');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}