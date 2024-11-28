import React, { useState } from "react";
import { signupUser, loginUser, parseJwt } from "../../service/loginservice";
import "./login.css"
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const Navigate=useNavigate();
  const showLogin = () => setActiveForm("login");
  const showSignUp = () => setActiveForm("signup");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage(
        "Password must include an uppercase letter, a digit, and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const encryptedPassword = btoa(password); // Encrypt password
    const response = await signupUser({
      username,
      password: encryptedPassword,
    });

    if (response.ok) {
      setErrorMessage(""); // Clear errors
      showLogin(); // Switch to login form
    } else {
      const message = await response.text();
      setErrorMessage(message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const encryptedPassword = btoa(password); // Encrypt password
    const response = await loginUser({
      username,
      password: encryptedPassword,
    });

    if (response.ok) {
      const token = await response.text();
      const payload = parseJwt(token);

      // Store user details and token
      localStorage.setItem("token", token);
      localStorage.setItem("username", payload.username);
      localStorage.setItem("userid", payload.userid);
      sessionStorage.setItem("isLoggedIn", "true");

      // Redirect to the home page
      setTimeout(() => {
        window.location.href = "/home";
        Navigate("/home")
      }, 100);
    } else if (response.status === 400) {
      setErrorMessage("Invalid username or password.");
    } else {
      setErrorMessage("An error occurred during login.");
    }
  };


  return (
    <>
    
      <div className="navborder">
        <img src="../assets/images.png" className="navimg" alt="Logo" />
        <nav className="navtag">
          <a href="/mainpage" className="atag">Mainpage</a>
        </nav>
      </div>

     
      <div className="parentdiv">
        <div className="parentdiv1">
         
          <div className="login">
            <div>
              <h1>LOGIN</h1>
              <h1>Your Account</h1>
              <button
                onClick={showLogin}
                className={activeForm === "login" ? "active-btn" : ""}
              >
                Login
              </button>
              <button
                onClick={showSignUp}
                className={activeForm === "signup" ? "active-btn" : ""}
              >
                Sign Up
              </button>
            </div>
          </div>

        
         
          <div className="formdiv ">
         
          {activeForm === "login" && (
              <form id="loginForm" onSubmit={handleLogin} className="loginform active-form">
                <h1>Login</h1>
                <label htmlFor="username">Username</label>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                 
                  id="signusername"
                  className="signinput"
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                   type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                
                  id="signpassword"
                  className="signinput"
                  required
                />
                <button type="submit" className="logbut">
                  LOGIN
                </button>
                {errorMessage && <span className="error">{errorMessage}</span>}
                <p>
                  Don't have an account?{" "}
                  <span onClick={showSignUp} className="toggle-link">
                    Sign up
                  </span>
                </p>
              </form>
            )}

          
            {activeForm === "signup" && (
              <form id="signUpForm" onSubmit={handleSignup} className="loginform active-form">
                <h1>Sign Up</h1>
                <label htmlFor="newUsername">Username</label>
                <input type="text"
                    placeholder="Username"
                     value={username}
                      onChange={(e) => setUsername(e.target.value)}
                 
                  className="signinput"
                  id="logusername"
                  required
                />
                <label htmlFor="newPassword">Password</label>
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 
                  className="signinput"
                  id="logpassword"
                  required
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                 type="password"
                 placeholder="Confirm Password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 
                  className="signinput"
                  id="conformpassword"
                  required
                />
                <span id="logspan_signup"></span>
                <button type="submit" className="logbut">
                  SIGN UP
                </button>
                {errorMessage && <span className="error">{errorMessage}</span>}

              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
