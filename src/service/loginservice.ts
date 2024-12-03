import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ApiService } from "../apiservice/apiservice"
import { Login } from "../models/loginmodel"

const api = new ApiService()
export const loginservice = () => {
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordErrorMessage, setpasswordErrorMessage] = useState<string>("");
  const [usernameErrorMessage, setusernameErrorMessage] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const Navigate = useNavigate();
  const showLogin = () => setActiveForm("login");
  const showSignUp = () => setActiveForm("signup");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();


    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    const usernamereg=/^[A-Za-z]{3,20}$/;
    if(!passwordPattern.test(password) && !usernamereg.test(username)){
      setpasswordErrorMessage(
        "Password must include an uppercase letter, a digit, and a special character."
      );
      setusernameErrorMessage(
        "enter minimum three charecters"
      );
      setTimeout(() => {
        setpasswordErrorMessage("");
        setusernameErrorMessage("");
        setUsername("")
        setPassword("")
        setConfirmPassword("");
      }, 1000);
      return;
    }
    if (!passwordPattern.test(password)) {
      setpasswordErrorMessage(
        "Password must include an uppercase letter, a digit, and a special character."
      ); 
       setTimeout(() => {
        setpasswordErrorMessage("");
        setUsername("")
        setPassword("")
        setConfirmPassword("");
      }, 1000);
      return;
    }
    if(!usernamereg.test(username)){
      setusernameErrorMessage(
        "enter minimum three charecters"
      );
      setTimeout(() => {
        setusernameErrorMessage("");
        setUsername("")
        setPassword("")
        setConfirmPassword("");
      }, 1000);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const encryptedPassword = btoa(password);
    const loginparams: Login.params = {
      username: username,
      password: encryptedPassword
    }
    const response = await api.apisendrequest(Login.signupname, loginparams) as Login.retrive;

    if (response.status) {
      setErrorMessage("");
      showLogin();
    } else {
      const message = await response.message;
      setErrorMessage(message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const encryptedPassword = btoa(password);
      const loginparams: Login.params = {
        username: username,
        password: encryptedPassword
      }
      const response = await api.apisendrequest(Login.name, loginparams) as Login.retrive;

      if (response.status) {
        const token: any = response.data?.token
        localStorage.setItem("token", token);
        localStorage.setItem("username", response.data!.username);
        localStorage.setItem("userid", String(response.data?.userid));
        sessionStorage.setItem("isLoggedIn", "true");


        setTimeout(() => {
          window.location.href = "/home";
          Navigate("/home")
        }, 100);
      } else if (!response.status) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage("An error occurred during login.");
      }
    } catch (error) {
      console.log(error)
    }
    
  };
  return {
    activeForm,
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
    usernameErrorMessage,
  };
};
