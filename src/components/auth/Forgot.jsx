import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import forgotPassword from "../../assets/auth/forgot-password.svg";
import wordify from "../../assets/auth/wordify.svg";
import passwordIcon from "../../assets/auth/password.svg";
import eye from "../../assets/auth/eye.svg";
import eyeOff from "../../assets/auth/eye-off.svg";

import { Context } from "../../context/Context";
import { isPassWeak } from "../../helper/auth.helper";

export default function Forgot() {
  // Navigation hook
  const navigate = useNavigate();

  // Context
  const { forgotEmail } = useContext(Context);

  // Input states
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState("");

  // Show password state
  const [showPassword, setShowPassword] = useState(false);

  // Error states
  const [passwordInsecure, setPasswordInsecure] = useState(false);
  const [OTPIncorrect, setOTPIncorrect] = useState(false);

  // Checking if user entered the URL manually or redirected
  useEffect(() => {
    !forgotEmail && navigate("/login");
  }, []);

  // OTP and password data
  const OTPData = {
    email: forgotEmail.trim(),
    otp: OTP.trim(),
    newPass: password.trim(),
  };

  // OTP verification and restore password function
  const handleForgotPassword = async () => {
    const passErr = isPassWeak(password, setPasswordInsecure);
    if (passErr) return;
    try {
      const url = "http://localhost:5000/verify-otp";
      await axios.post(url, OTPData);
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response.data.type === "IncOTP") return setOTPIncorrect(true);
    }
  };

  // Form submission function
  const formSubmit = async (e) => {
    e.preventDefault();
    setPasswordInsecure(false);
    handleForgotPassword();
  };

  return (
    <div className="forgot-container login-container">
      <div className="left-side">
        <form onSubmit={formSubmit} className="login-wrapper">
          <div className="logo-wrapper">
            <img src={wordify} className="logo" />
          </div>
          <div className="tagline-wrapper">
            <p>Access all your notes from anywhere</p>
          </div>
          <div className="login-text-wrapper">
            <p>Reset your password</p>
          </div>
          <div className="forgot-send-to">
            A code is sent to&nbsp;
            <span>{forgotEmail}</span>
          </div>
          <div className="input-wrapper">
            <div className="otp-wrapper">
              <img src={passwordIcon} className="otp" />
              <input
                className={OTPIncorrect ? "input-error" : null}
                type="text"
                placeholder="Enter code"
                id="otp"
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
            <p className={`error ${OTPIncorrect ? "show-error" : null}`}>
              Please enter correct OTP
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
            <button type="submit">Continue</button>
          </div>
          <div className="signup-wrapper">
            Want a new account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
      <div className="right-side">
        <div className="illustration-wrapper">
          <img className="illustration" src={forgotPassword} />
        </div>
      </div>
    </div>
  );
}