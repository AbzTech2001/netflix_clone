import React, { useState } from "react";
import "./Login.css";
import SignupScreen from "./SignupScreen";
const Login = () => {
  const [SignIn, setSignIn] = useState(false);
  return (
    <div className="Login">
      <div className="Login_background">
        <img
          className="Login_logo"
          src="https://imgs.search.brave.com/iMK0bpQOHFE9qAS6J2UI9mfJ97x8nhrepANtIF_PSds/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1Mjku/cG5n"
          alt="Netflix_logo"
        />
        <button onClick={() => setSignIn(true)} className="Login_button">
          Sign In
        </button>
        <div className="Login_gradient" />
      </div>
      <div className="Login_body">
        {SignIn ? (
          <SignupScreen />
        ) : (
          <>
            <h1>Unlimited movies, Tv program and more.</h1>
            <h2>Watch anywhere, Cancel at anytime!!</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="Login_input">
              <form>
                <input type="email" placeholder="Email Address" required />
                <button
                  onClick={() => setSignIn(true)}
                  className="Login_getStarted"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
