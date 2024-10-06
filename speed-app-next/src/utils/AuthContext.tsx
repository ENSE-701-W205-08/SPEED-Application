'use client'

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

// Define the shape of the context state and actions
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, expiryTime: number) => void;
  logout: () => void;
  resetExpiryTime: () => void; // Function to reset expiry when user is active
}

// Create a default context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(null);

  // Function to handle user logout
  const logout = useCallback(() => {
    localStorage.removeItem('token'); // Clear the token on logout
    localStorage.removeItem('tokenExpiry'); // Clear token expiry time
    setTokenExpiry(null); // Clear the expiry time from state
    setIsLoggedIn(false); // Set the logged-out state
    console.log('User logged out');
  }, []);

  // Function to handle user login and store token and its expiry time
  const login = useCallback((token: string, expiryTime: number) => {
    localStorage.setItem('token', token); // Store the token
    localStorage.setItem('tokenExpiry', expiryTime.toString()); // Store the expiry time in localStorage
    setTokenExpiry(expiryTime); // Set expiry time in state
    setIsLoggedIn(true); // Set logged-in state
    console.log('User logged in, expiry set to:', new Date(expiryTime).toISOString());
  }, []);

  // Function to reset expiry time when the user is active
  const resetExpiryTime = useCallback(() => {
    if (isLoggedIn && tokenExpiry) {
      const newExpiryTime = Date.now() + (15 * 60 * 1000); // Extend the session by 15 minutes
      localStorage.setItem('tokenExpiry', newExpiryTime.toString()); // Update in localStorage
      setTokenExpiry(newExpiryTime); // Update expiry time in state
      console.log('Token expiry extended to:', new Date(newExpiryTime).toISOString());
    }
  }, [isLoggedIn, tokenExpiry]);

  // Timer to check every minute if the token has expired
  useEffect(() => {
    const checkTokenExpiry = () => {
      if (tokenExpiry && Date.now() >= tokenExpiry) {
        logout(); // Logout the user if the expiry time has passed
      }
    };

    const intervalId = setInterval(checkTokenExpiry, 60 * 1000); // Check every minute
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [tokenExpiry, logout]);

  // Check for token and its expiry on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpiry = localStorage.getItem('tokenExpiry');

    if (storedToken && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      if (Date.now() < expiryTime) {
        setTokenExpiry(expiryTime); // Set the expiry time from localStorage
        setIsLoggedIn(true); // Set the user as logged in
        console.log('User logged in from localStorage, expiry:', new Date(expiryTime).toISOString());
      } else {
        logout(); // If the token has expired, log the user out
      }
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, resetExpiryTime }}>
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
