import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

// Define the shape of the context state and actions
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create a default context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Set timeout duration (e.g., 15 minutes)
const TIMEOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Function to clear the timeout (if exists)
  const clearLogoutTimeout = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }, [timeoutId]);

  // Function to set a timeout to automatically log the user out
  const setLogoutTimeout = useCallback(() => {
    clearLogoutTimeout(); // Clear any existing timeout
    const id = setTimeout(() => {
      logout(); // Automatically log out the user
    }, TIMEOUT_DURATION); // Set the timeout duration
    setTimeoutId(id); // Store the timeout ID so we can clear it later
  }, [clearLogoutTimeout]);

  // Handle user login
  const login = () => {
    setIsLoggedIn(true);
    setLogoutTimeout(); // Set the logout timeout after login
  };

  // Handle user logout
  const logout = useCallback(() => {
    localStorage.removeItem('token'); // Remove the token on logout
    setIsLoggedIn(false);
    clearLogoutTimeout(); // Clear the timeout when logging out
  }, [clearLogoutTimeout]);

  // Check for token in localStorage to set initial logged-in state
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists
    if (token) {
      setLogoutTimeout(); // Set the timeout if the user is already logged in
    }
  }, [setLogoutTimeout]);

  // Track user activity (mouse movement or key press) to reset the logout timeout
  useEffect(() => {
    const handleActivity = () => {
      if (isLoggedIn) {
        setLogoutTimeout(); // Reset the timeout on any user activity
      }
    };

    window.addEventListener('mousemove', handleActivity); // Track mouse movement
    window.addEventListener('keydown', handleActivity); // Track key presses

    return () => {
      window.removeEventListener('mousemove', handleActivity); // Cleanup event listeners
      window.removeEventListener('keydown', handleActivity);
    };
  }, [isLoggedIn, setLogoutTimeout]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
