"use client"; // Directive for Next.js to ensure this component runs on the client-side.

import React, { useState } from "react"; // Imports React and the useState hook for managing component state.
import Link from "next/link"; // Imports Next.js Link component for client-side navigation.
import Image from "next/image"; // Imports Next.js Image component for optimized image handling.
import {useRouter} from "next/navigation"; // Imports Next.js router for navigation.
import logoImage from "../../../../public/Logo.jpeg"; // Imports the logo image.


// Defines the RegisterForm component.
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // useRouter hook to enable programmatic navigation.
  const router = useRouter();
  
  // Handles the registration form submission.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior.

    // Client-side validation to check if passwords match.
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match"); // Sets an error message if passwords don't match.
      return; // Exits the function if passwords don't match.
    }

    try {
      // Sends a POST request to the registration API endpoint.
      const response = await fetch("/api/register", { // API endpoint for registration.
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Sets the content type of the request body to JSON.
        },
        body: JSON.stringify({ name, password, email }) // Sends name, email, and password in the request body.
      });
      // Parses the JSON response from the API.
      const data = await response.json();
      
      // Checks if the API request was not successful.
      if (!response.ok) {
        setErrorMsg(data.error || "Registration failed"); // Sets an error message from the API response or a default message.
      } else {
        setSuccessMsg(data.message); // Sets a success message from the API response.
        // Stores the new user's ID in session storage upon successful registration.
        sessionStorage.setItem("userId", JSON.stringify(data.user));
      }
    } catch (error) {
      // Logs any unexpected errors during the registration process to the console.
      console.error("Error during registration:", error);
      setErrorMsg("An unexpected error occurred"); // Sets a generic error message for unexpected issues.
    }
  };

  // Effect hook to redirect the user to the homepage upon successful registration.
  if (successMsg !== "") {
    router.replace("/"); // Replaces the current history entry with the homepage URL.
  }
  
  // JSX for the registration form.
  return (
    <div className="auth-container"> {/* Main container for the authentication page layout. */}
      <div className="left-section"> {/* Section for displaying a decorative image. */}
        <Image src={logoImage} alt="Decorative" className="auth-image" /> {/* Displays the logo image. */}
      </div>
      <div className="right-section"> {/* Section for the registration form. */}
        <form className="auth-form" onSubmit={handleSubmit}> {/* Registration form element with submit handler. */}
          <h2>Create Account</h2>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>} {/* Displays error message if 'errorMsg' is not empty. */}
          {successMsg && <p style={{ color: "green" }}>{successMsg}</p>} {/* Displays success message if 'successMsg' is not empty. */}
          <div className="form-group"> {/* Container for the name input. */}
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              required // Makes the name field mandatory.
              value={name} // Binds the input value to the name state.
              onChange={(e) => setName(e.target.value)} // Updates name state on change.
            />
          </div>
          <div className="form-group"> {/* Container for the email input. */}
            <input
              type="email"
              id="email"
              placeholder="Email"
              required // Makes the email field mandatory.
              value={email} // Binds the input value to the email state.
              onChange={(e) => setEmail(e.target.value)} // Updates email state on change.
            />
          </div>
          <div className="form-group"> {/* Container for the password input. */}
            <input
              type="password"
              id="password"
              placeholder="Password"
              required // Makes the password field mandatory.
              value={password} // Binds the input value to the password state.
              onChange={(e) => setPassword(e.target.value)} // Updates password state on change.
            />
          </div>
          <div className="form-group"> {/* Container for the confirm password input. */}
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              required // Makes the confirm password field mandatory.
              value={confirmPassword} // Binds the input value to the confirmPassword state.
              onChange={(e) => setConfirmPassword(e.target.value)} // Updates confirmPassword state on change.
            />
          </div>
          <div className="remember-me"> {/* Container for the "Terms of Service" agreement. */}
            <label>
              <input type="checkbox" /> {/* Checkbox for agreeing to terms. */}
              Agree with Terms of Service
            </label>
          </div>
          <button type="submit" className="auth-button"> {/* Submit button for the form. */}
            Sign Up
          </button>
          <div className="auth-link"> {/* Link to the login page for existing users. */}
            Already have an account? <Link href="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm; // Exports the RegisterForm component.