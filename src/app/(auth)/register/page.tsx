import React from 'react'

import Link from 'next/link'

const page = () => {
  return (
    <div>
       <div className="auth-container">
            <div className="left-section">
              <img 
                src="Logo.jpeg" 
                alt="Decorative" 
                className="auth-image"
              />
            </div>
            <div className="right-section">
              <form className="auth-form" >
                <h2>Create Account</h2>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="confirmPassword"
                    
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div className="remember-me">
                  <label>
                    <input
                      type="checkbox"
                      
                    />
                    Agree with Terms of Service
                  </label>
                </div>
                <button type="submit" className="auth-button">Sign Up</button>
                <div className="auth-link">
                  Already have an account? <Link href="/login">Sign In</Link>
                </div>
              </form>
            </div>
          </div>
    </div>
  )
}

export default page
