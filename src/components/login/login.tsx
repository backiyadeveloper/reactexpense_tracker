import React from "react";
import {loginservice} from "../../service/loginservice"
import "./login.css"

const Login: React.FC = () => {
  const { activeForm,
    username,
    password,
    confirmPassword,
    errorMessage,
    setUsername,
    setPassword,
    setConfirmPassword,
    showLogin,
    showSignUp,
    handleSignup,
    handleLogin,
    passwordErrorMessage,
    usernameErrorMessage,}=loginservice()
 

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
                {usernameErrorMessage && <span className="error">{usernameErrorMessage}</span>}
                <label htmlFor="newPassword">Password</label>
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 
                  className="signinput"
                  id="logpassword"
                  required
                /> {passwordErrorMessage && <span className="error">{passwordErrorMessage}</span>}
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
