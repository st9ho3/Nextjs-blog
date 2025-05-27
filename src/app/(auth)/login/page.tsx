"use client" // Directive for Next.js to ensure this component runs on the client-side.

import React, { useState }  from 'react' // Imports React and the useState hook for managing component state.
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'; // Imports Firebase authentication methods.
import { useRouter } from 'next/navigation' // Imports Next.js router for navigation.
import Link from 'next/link' // Imports Next.js Link component for client-side navigation.
import Image from 'next/image' // Imports Next.js Image component for optimized image handling.
import logoImage from "../../../../public/Logo.jpeg" // Imports the logo image.


// Defines the LoginForm component.
const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>("");
  // useRouter hook to enable programmatic navigation.
  const router = useRouter();

  // Initializes Firebase Auth service.
  const auth = getAuth();

  // Handles the login form submission.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior.
    setError(''); // Clears any previous errors.

    try {
      // Attempts to sign in the user with Firebase using email and password.
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Retrieves the ID token from the successfully signed-in user.
      const idToken = await userCredential.user.getIdToken();
      
      // Sends the ID token to the backend API to create a session cookie.
      const response = await fetch('/api/login', { // API endpoint for login.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }), // Sends the ID token in the request body.
      });

      // Checks if the session creation was successful.
      if (!response.ok) {
        throw new Error('Failed to create session'); // Throws an error if session creation fails.
      }

      // Redirects the user to the homepage upon successful login.
      router.push('/');
      router.refresh(); // Refreshes the page to ensure auth state is updated across the app.
    } catch (error: unknown) {
      // Sets the error message if login fails.
      setError( error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      // setLoading(false); // setLoading(false) was removed, if it was intended, it should be reinstated here
    }
  };

  

  // JSX for the login form.
  return (
    <div>
      <div className="auth-container"> {/* Main container for the authentication page layout. */}
            <div className="left-section"> {/* Section for displaying a decorative image. */}
              <Image 
                src={logoImage} // Source of the logo image.
                alt="Decorative" 
                className="auth-image" // CSS class for styling the image.
              />
            </div>
            <div className="right-section"> {/* Section for the login form. */}
              {error && <h4>{error}</h4> } {/* Displays an error message if the 'error' state is not null. */}
              <form className="auth-form" onSubmit={handleLogin} > {/* Login form element with submit handler. */}
                <h2>Sign In</h2>
                 {/* This h4 seems to be an empty placeholder for spacing or a potential future message. */}
                 <h4 style={{paddingBottom: '1rem', color: 'red' }}></h4>
                {/* {loginFailMessage && <h4 style={{paddingBottom: '1rem', color: 'red' }}>{loginFailMessage}</h4>} */}
                 <div className="form-group"> {/* Container for the email input. */}
                  <input
                    onChange={(e) => setEmail(e.target.value)} // Updates email state on change.
                    value={email} // Binds the input value to the email state.
                    type="email"
                    name="email"
                    placeholder="Email"
                    required // Makes the email field mandatory.
                  />
                </div>
                <div className="form-group"> {/* Container for the password input. */}
                  <input
                  onChange={(e) => setPassword(e.target.value)} // Updates password state on change.
                    value={password} // Binds the input value to the password state.
                    type="password"
                    name="password"
                    placeholder="Password"
                    required // Makes the password field mandatory.
                  />
                </div>
                <div className="remember-me"> {/* Container for the "Remember me" checkbox. */}
                  <label>
                    <input
                      
                      type="checkbox"
                      
                    />
                    Remember me
                  </label>
                </div>
                <button
                type="submit" className="auth-button"> {/* Submit button for the form. */}
                  Sign in
                  </button>
                <div className="auth-link"> {/* Link to the registration page. */}
                  Don&apos;t have an account? <Link href="/register">Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
    </div>
  )
}

export default LoginForm // Exports the LoginForm component.