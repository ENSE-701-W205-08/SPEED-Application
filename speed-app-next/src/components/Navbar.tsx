// src/components/Navbar.tsx

"use client"; // Ensure this is a client-side component

import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { useAuth } from '@/utils/AuthContext'; // Import the AuthContext


export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, logout } = useAuth(); // Access global login state and actions
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Call the global logout function
    router.push('/login'); // Redirect to login page after logout
  };

  const navBarTheme =
    theme == "dark" ? "bg-dark navbar-dark" : "bg-light navbar-light";
  return (
    <nav className={"navbar navbar-expand-lg fixed-top " + navBarTheme}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          SPEED App
        </a>

        {/* Button to trigger the sidebar */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas Sidebar */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav ms-auto">
              <li className={"nav-item"}>
                <Link href="/articles/submit" className={"nav-link"}>
                  Submit an Article
                </Link>
              </li>
              <li
                className={
                  "nav-item" + (pathname == "/articles/submit" ? " active" : "")
                }
              >
                <Link
                  href="/articles/search"
                  className={
                    "nav-link" +
                    (pathname == "/articles/search" ? " active" : "")
                  }
                >
                  Search Articles
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className={"nav-item"}>
                    <Link href="/admin/dashboard" className={"nav-link"}>Dashboard</Link>
                  </li>
                  <li>
                    <a href="" onClick={handleLogout} className={"nav-link"}>Logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li className={"nav-item"}>
                    <Link href="/login" className={"nav-link"}>Login</Link>
                  </li>
                </>
              )}
            </ul>
            <button className="btn btn-secondary" onClick={toggleTheme}>
              {theme === "dark" ? (
                <i className="bi bi-sun-fill"></i> // Light mode icon (sun)
              ) : (
                <i className="bi bi-moon-fill"></i> // Dark mode icon (moon)
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
