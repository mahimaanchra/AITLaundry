import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useLaundryStore } from '../stores/laundryStore';
import { useShallow } from 'zustand/react/shallow';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const isInitialized = useRef(false);
  
  // Use stable selector with useShallow to prevent re-render loops
  const { theme, toggleTheme, setTheme } = useLaundryStore(
    useShallow((state) => ({
      theme: state.theme.mode,
      toggleTheme: state.toggleTheme,
      setTheme: state.setTheme
    }))
  );

  // Initialize theme from localStorage ONCE on mount, before any renders
  useEffect(() => {
    if (!isInitialized.current) {
      const savedTheme = localStorage.getItem('washlog-theme');
      if (savedTheme && savedTheme !== theme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme);
      }
      isInitialized.current = true;
    }
  }, [setTheme, theme]);

  // Apply theme to document root (only when theme actually changes)
  useEffect(() => {
    const root = document.documentElement;
    
    // Use classList.toggle for more reliable state management
    root.classList.toggle('dark', theme === 'dark');
    
    // Store in localStorage
    localStorage.setItem('washlog-theme', theme);
  }, [theme]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    theme,
    toggleTheme,
    setTheme
  }), [theme, toggleTheme, setTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};