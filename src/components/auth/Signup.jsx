import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import takingNote from "../../assets/auth/adding-notes.svg";
import wordify from "../../assets/auth/wordify.svg";
import google from "../../assets/auth/google.svg";
import facebook from "../../assets/auth/facebook.svg";
import twitter from "../../assets/auth/twitter.svg";
import emailIcon from "../../assets/auth/email.svg";
import passwordIcon from "../../assets/auth/password.svg";
import userIcon from "../../assets/auth/user.svg";
import eye from "../../assets/auth/eye.svg";
import eyeOff from "../../assets/auth/eye-off.svg";

import { Context } from "../../context/Context";
import {
  isEmailInvalid,
  isNameShort,
  isPassWeak,
} from "../../helper/auth.helper";

export default function Signup() {
  // Navigation hook
  const navigate = useNavigate();

  // Context
  const { user, setUser } = useContext(Context);

  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Show password state
  const [showPassword, setShowPassword] = useState(false);

  // Signup response error state
  const [signupErr, setSignupErr] = useState({});

  // Show error states
  const [nameShort, setNameShort] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordInsecure, setPasswordInsecure] = useState(false);

  // User data for signup
  const userData = {
    name: name.trim(),
    email: email.trim(),
    password: password.trim(),
  };

  // Signup function
  const handleSignup = async () => {
    const url = "http://localhost:5000/local/signup";
    const nameErr = isNameShort(name, setNameShort);
    const emailErr = isEmailInvalid(email, setEmailError);
    const passErr = isPassWeak(password, setPasswordInsecure);
    if (nameErr || emailErr || passErr) return;

    try {
      const res = await axios.post(url, userData, { withCredentials: true });
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      if (err.response.data.type === "EmailExist") setEmailError(true);
      setSignupErr(err.response.data);
    }
  };

  // Form submission function
  const formSubmit = (e) => {
    e.preventDefault();
    setSignupErr({});
    handleSignup();
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <form onSubmit={formSubmit} className="login-wrapper">
          <div className="logo-wrapper">
            <img src={wordify} className="logo" />
          </div>
          <div className="tagline-wrapper">
            <p>Access all your notes from anywhere</p>
          </div>
          <div className="login-text-wrapper">
            <p>Create a new account</p>
          </div>
          <div className="input-wrapper">
            <div className="name-wrapper">
              <img src={userIcon} className="name" />
              <input
                className={nameShort ? "input-error" : null}
                type="text"
                placeholder="Enter your name"
                id="name"
                autoCapitalize="words"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <p className={`error ${nameShort ? "show-error" : null}`}>
              Name is too short
            </p>
            <div className="email-wrapper">
              <img src={emailIcon} className="email" />
              <input
                className={emailError ? "input-error" : null}
                type="email"
                placeholder="Enter your email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className={`error ${emailError ? "show-error" : null}`}>
              {signupErr.type === "EmailExist"
                ? "Email is already in use"
                : "Please enter a valid email"}
            </p>
            <div className="password-wrapper">
              <img src={passwordIcon} className="password" />
              <img
                src={showPassword ? eyeOff : eye}
                title={showPassword ? "Hide Password" : "Show Password"}
                className="eye"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              />
              <input
                className={passwordInsecure ? "input-error" : null}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <p
            className={`pw-error error ${
              passwordInsecure ? "show-error" : null
            }`}
          >
            Password should be atleast 6 character long
          </p>
          <div className="btn-wrapper">
            <button type="submit">Sign up</button>
          </div>
          <div className="continue-wrapper">
            <p>or continue with</p>
          </div>
          <div className="social-wrapper">
            <Link title="Google" to="/connect" className="google">
              <img src={google} />
            </Link>
            <Link title="Facebook" to="/connect" className="facebook">
              <img src={facebook} />
            </Link>
            <Link title="Twitter" to="/connect" className="twitter">
              <img src={twitter} />
            </Link>
          </div>
          <div className="signup-wrapper">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
      <div className="right-side">
        <div className="illustration-wrapper">
          <img className="illustration" src={takingNote} />
        </div>
      </div>
    </div>
  );
}
