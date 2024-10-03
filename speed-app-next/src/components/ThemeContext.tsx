'use client'; // This is a client-side component

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the context type
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // On mount, check the system preference or stored theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
    } else {
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const preferredTheme = userPrefersDark ? 'dark' : 'light';
      setTheme(preferredTheme);
      document.documentElement.setAttribute('data-bs-theme', preferredTheme);
    }
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save the theme to localStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
