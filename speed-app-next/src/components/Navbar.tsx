// src/components/Navbar.tsx

'use client'; // Ensure this is a client-side component

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use usePathname to get the current route
import React from 'react';
import { useTheme } from './ThemeContext'; // Import useTheme from ThemeContext

export default function Navbar() {
  const pathname = usePathname(); // Get the current pathname
  const { theme, toggleTheme } = useTheme(); // Access the theme and toggle function from ThemeContext

  // Dynamic class for dark or light theme
  const navBarTheme = theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light';

  return (
    <nav className={`navbar navbar-expand-lg ${navBarTheme}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">SPEED App</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item ${pathname === '/articles/submit' ? 'active' : ''}`}>
              <Link href="/articles/submit" className="nav-link">Submit an Article</Link>
            </li>
            <li className={`nav-item ${pathname === '/articles/search' ? 'active' : ''}`}>
              <Link href="/articles/search" className="nav-link">Search Articles</Link>
            </li>
            <li className={`nav-item ${pathname === '/login' ? 'active' : ''}`}>
              <Link href="/login" className="nav-link">Login</Link>
            </li>
          </ul>

          {/* Add the toggle theme button */}
          <button className="btn btn-secondary ms-auto" onClick={toggleTheme}>
            Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </nav>
  );
}
