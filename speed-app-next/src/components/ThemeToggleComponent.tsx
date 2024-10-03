'use client';
import 'bootstrap/dist/js/bootstrap.bundle';
import React from 'react';
import { useTheme } from '../components/ThemeContext'; // Import the theme context hook

export default function ThemeToggleComponent() {
    
    const { theme, toggleTheme } = useTheme(); // Access the theme and toggle function from context

    return (
      <div>
        <button className="btn btn-secondary mb-3" onClick={toggleTheme}>
          Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    );
  }