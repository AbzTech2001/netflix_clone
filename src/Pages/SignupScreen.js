import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignupScreen.css";

const SignupScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const Signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="SignupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Enter your email" />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter your password"
        />
        <button type="submit" onClick={Signin}>
          Sign In
        </button>
        <h4>
          <span className="Login_gray">New to netflix?</span>
          <span className="Login_link" onClick={register}>
            Sign Up
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignupScreen;
