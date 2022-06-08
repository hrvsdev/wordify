import { useState } from "react";
import { Link } from "react-router-dom";
import { validate } from "email-validator";
import { parse } from "query-string";
import { AES, enc } from "crypto-js";

import forgotPassword from "../../assets/auth/forgot-password.svg";
import wordify from "../../assets/auth/wordify.svg";
import passwordIcon from "../../assets/auth/password.svg";
import eye from "../../assets/auth/eye.svg";
import eyeOff from "../../assets/auth/eye-off.svg";

export default function Forgot() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [passwordInsecure, setPasswordInsecure] = useState(false);
  const [otpIncorrect, setOtpIncorrect] = useState(false);

  const formSubmit = (e) => {
    e.preventDefault();
    setPasswordInsecure(password.length >= 6 ? false : true);
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
            <span>
              {AES.decrypt(parse(location.search).id, "MY_SECRET_KEY").toString(
                enc.Utf8
              )}
            </span>
          </div>
          <div className="input-wrapper">
            <div className="otp-wrapper">
              <img src={passwordIcon} className="otp" />
              <input
                className={otpIncorrect ? "input-error" : null}
                type="text"
                placeholder="Enter code"
                id="otp"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <p className={`error ${otpIncorrect ? "show-error" : null}`}>
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
