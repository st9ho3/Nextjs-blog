"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";


const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/register/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password, email })
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "Registration failed");
      } else {
        setSuccessMsg(data.message);
        // Optionally, redirect the user or reset form state
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMsg("An unexpected error occurred");
    }
  };

  return (
    <div className="auth-container">
      <div className="left-section">
        <Image src="Logo.jpeg" alt="Decorative" className="auth-image" />
      </div>
      <div className="right-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="remember-me">
            <label>
              <input type="checkbox" />
              Agree with Terms of Service
            </label>
          </div>
          <button type="submit" className="auth-button">
            Sign Up
          </button>
          <div className="auth-link">
            Already have an account? <Link href="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
