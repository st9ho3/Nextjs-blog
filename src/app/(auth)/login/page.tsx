"use client"

import React, { useState }  from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import logoImage from "../../../../public/Logo.jpeg"


const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await fetch("/login/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ password, email })
        });
        const data = await response.json();
        
        if (!response.ok) {
          setErrorMsg(data.error || "Login failed");
        } else {
          setSuccessMsg(data.message);
          // Optionally, redirect the user or reset form state
          sessionStorage.setItem("userId", JSON.stringify(data.user));
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setErrorMsg("An unexpected error occurred");
      }
    };

    if (successMsg !== "") {
      router.replace("/");
    }

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
              {errorMsg && <h4>{errorMsg}</h4> }
              <form className="auth-form" onSubmit={handleSubmit} >
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
