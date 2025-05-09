"use client"

import React, { useState, useEffect, FormEvent }  from 'react'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/app/_db/AuthContext';
import { auth } from '../../_db/Firebase'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import logoImage from "../../../../public/Logo.jpeg"


const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();

  const auth = getAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get the ID token
      const idToken = await userCredential.user.getIdToken();
      
      // Send the token to your backend to create a session cookie
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      // Redirect to the dashboard
      router.push('/');
      router.refresh(); // Refresh the page to update the auth state
    } catch (error: any) {
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div>
      <div className="auth-container">
            <div className="left-section">
              <Image 
                src={logoImage}
                alt="Decorative" 
                className="auth-image"
              />
            </div>
            <div className="right-section">
              {error && <h4>{error}</h4> }
              <form className="auth-form" onSubmit={handleLogin} >
                <h2>Sign In</h2>
                 <h4 style={{paddingBottom: '1rem', color: 'red' }}></h4>
                {/* {loginFailMessage && <h4 style={{paddingBottom: '1rem', color: 'red' }}>{loginFailMessage}</h4>} */}
                 <div className="form-group">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                  onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="remember-me">
                  <label>
                    <input
                      
                      type="checkbox"
                      
                    />
                    Remember me
                  </label>
                </div>
                <button
                type="submit" className="auth-button">
                  Sign in
                  </button>
                <div className="auth-link">
                  Don&apos;t have an account? <Link href="/register">Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
    </div>
  )
}

export default LoginForm
