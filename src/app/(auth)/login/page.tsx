import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logoImage from "../../../../public/Logo.jpeg"

const page = () => {
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
              <form className="auth-form" method='post' >
                <h2>Sign In</h2>
                 <h4 style={{paddingBottom: '1rem', color: 'red' }}></h4>
                {/* {loginFailMessage && <h4 style={{paddingBottom: '1rem', color: 'red' }}>{loginFailMessage}</h4>} */}
                 <div className="form-group">
                  <input
                    type="email"
                    name="username"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
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

export default page
