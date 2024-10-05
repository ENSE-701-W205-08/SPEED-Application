'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/utils/api"; // Assume this sends login request to the backend
import { useAuth } from "@/utils/AuthContext"; // Import the AuthContext

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth(); // Access the global login function
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    try {
      const response = await loginAdmin(email, password); // API call to authenticate user
      localStorage.setItem("token", response.token); // Store the JWT token in localStorage

      login(); // Call the global login function to update isLoggedIn state
      router.push("/admin/dashboard"); // Redirect to the dashboard after login
    } catch (error) {
      setErrorMessage((error as Error).message || "Error logging in");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
